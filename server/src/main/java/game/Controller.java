package game;

import org.eclipse.jetty.websocket.api.Session;
import party_related.RandomParty;
import party_related.TimedParty;

import java.util.concurrent.ConcurrentHashMap;

public class Controller implements IStopWatchCallback
{
    private static Controller controller;

    private final StopWatch<Controller> timedPartyStatusTimer;
    private static final int STATUS_TIMER_DURATION = 600; // 10 minutes

    private final TimedParty timedParty;

    private final ConcurrentHashMap<String, RandomParty> realmToParties;
    private final ConcurrentHashMap<Session, Client> sessionToPlayer;

    public static Controller getInstance()
    {
        if (controller == null)
        {
            controller = new Controller();
        }

        return controller;
    }

    private Controller()
    {
        timedPartyStatusTimer = new StopWatch<>(this, "timedPartyStatusUpdater", 10000);
        timedPartyStatusTimer.updateTime(STATUS_TIMER_DURATION);

        timedParty = new TimedParty(this);
        timedParty.loadCategory();

        realmToParties = new ConcurrentHashMap<>();
        sessionToPlayer = new ConcurrentHashMap<>();
    }

    synchronized public void receiveMessage(Session session, String message)
    {
        if (!session.isOpen() || message.isEmpty())
        {
            return;
        }

        String[] lines = message.split("\\n");

        switch (lines[0])
        {
            case "connect":
            {
                if (lines.length > 3)
                {
                    String realm = lines[1];
                    String wallet = lines[2];
                    String nick = lines[3];

                    Client player = new Client(session, realm, wallet, nick);

                    if (timedParty.isShouldConnect())
                    {
                        if (!sessionToPlayer.containsKey(session))
                        {
                            sessionToPlayer.put(session, player);
                        }

                        timedParty.connectPlayer(player);
                    }
                    else
                    {
                        connectToRandomParty(player);
                    }
                }

                break;
            }
            case "join":
            {
                if (timedParty.isShouldJoin())
                {
                    timedParty.joinPlayer(sessionToPlayer.get(session));
                }
                else if (!timedParty.isShouldConnect())
                {
                    joinRandomParty(session);
                }

                break;
            }
            default:
            {
                if (sessionToPlayer.containsKey(session))
                {
                    Client player = sessionToPlayer.get(session);

                    if (timedParty.isShouldJoin())
                    {
                        timedParty.receive(player, message);
                    }
                    else
                    {
                        realmToParties.get(player.getRealm()).receive(player, message);
                    }
                }

                break;
            }
        }
    }

    synchronized private void connectToRandomParty(Client player)
    {
        if (!sessionToPlayer.containsKey(player.getSession()))
        {
            sessionToPlayer.put(player.getSession(), player);
        }

        if (realmToParties.containsKey(player.getRealm()))
        {
            RandomParty party = realmToParties.get(player.getRealm());
            party.connectPlayer(player);
        }
        else
        {
            RandomParty party = new RandomParty();
            party.loadCategory();
            party.connectPlayer(player);

            realmToParties.put(player.getRealm(), party);
        }
    }

    synchronized private void joinRandomParty(Session session)
    {
        if (!sessionToPlayer.containsKey(session))
        {
            return;
        }

        Client player = sessionToPlayer.get(session);
        RandomParty party = realmToParties.get(player.getRealm());

        if (party != null)
        {
            party.joinPlayer(player);
        }
    }

    synchronized private void disconnectFromRandomParty(Client player)
    {
        if (player != null)
        {
            sessionToPlayer.remove(player.getSession());
            RandomParty party = realmToParties.get(player.getRealm());

            if (party != null)
            {
                party.disconnectPlayer(player);

                if (party.isStarted() && party.isPlayingEmpty())
                {
                    party.finish();
                }

                if (party.isCompletelyEmpty())
                {
                    party.close();
                    realmToParties.remove(player.getRealm());
                }
            }

            timedParty.disconnectPlayer(player);
        }
    }

    synchronized public void disconnect(Session session)
    {
        disconnectFromRandomParty(sessionToPlayer.get(session));

        if (timedParty.isStarted() && timedParty.isPlayingEmpty())
        {
            timedParty.finish();
        }
    }

    synchronized public void reconnectEveryoneToTimed(boolean finishRandom)
    {
        for (var party : realmToParties.values())
        {
            party.mute();

            if (party.isStarted())
            {
                if (finishRandom)
                {
                    party.finish();
                }
                else
                {
                    continue;
                }
            }

            for (var player : party.getIdlePlayers().values())
            {
                timedParty.connectPlayer(player);
            }

            party.clear();
        }
    }

    synchronized public void reconnectEveryoneFromTimed(boolean clearRandom)
    {
        if (clearRandom)
        {
            for (var party : realmToParties.values())
            {
                party.unMute();
                party.clear();
            }
        }

        for (var player : timedParty.getIdlePlayers().values())
        {
            connectToRandomParty(player);
        }

        timedParty.clear();
    }

    synchronized public void broadcastAll(String response)
    {
        timedParty.broadcastAll(response);

        if (realmToParties != null)
        {
            for (var party : realmToParties.values())
            {
                party.broadcastAll(response);
            }
        }
    }

    @Override
    public void updateTimer(String name, int timeLeft)
    {
        if (timedParty != null && !timedParty.isQuestionsLoaded())
        {
            timedParty.loadCategory();
        }
    }

    @Override
    public void onTimerEnd(String name)
    {
        timedPartyStatusTimer.updateTime(STATUS_TIMER_DURATION);
    }
}
