package game;

import org.eclipse.jetty.websocket.api.Session;
import party_related.Party;
import party_related.TimedParty;

import java.util.concurrent.ConcurrentHashMap;

public class Controller implements IStopWatchCallback
{
    private static Controller controller;

    private final StopWatch<Controller> timedPartyStatusTimer;
    private static final int STATUS_TIMER_DURATION = 600; // 10 minutes

    private final TimedParty timedParty;

    private boolean canJoinTimedParty;
    private boolean canConnectToTimedParty;

    private final ConcurrentHashMap<String, Party> realmToParties;
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
        canJoinTimedParty = false;
        canConnectToTimedParty = false;

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

                    if (canConnectToTimedParty)
                    {
                        if (!sessionToPlayer.containsKey(session))
                        {
                            sessionToPlayer.put(session, player);
                        }

                        timedParty.connectPlayer(player);
                    }
                    else
                    {
                        connectToParty(player);
                    }
                }

                break;
            }
            case "join":
            {
                if (canJoinTimedParty)
                {
                    timedParty.joinPlayer(sessionToPlayer.get(session));
                }
                else if (!canConnectToTimedParty)
                {
                    joinParty(session);
                }

                break;
            }
            default:
            {
                if (sessionToPlayer.containsKey(session))
                {
                    Client player = sessionToPlayer.get(session);

                    if (canJoinTimedParty)
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

    synchronized private void connectToParty(Client player)
    {
        if (!sessionToPlayer.containsKey(player.getSession()))
        {
            sessionToPlayer.put(player.getSession(), player);
        }

        if (realmToParties.containsKey(player.getRealm()))
        {
            Party party = realmToParties.get(player.getRealm());
            party.connectPlayer(player);
        }
        else
        {
            Party party = new Party();
            party.loadCategory();
            party.connectPlayer(player);

            realmToParties.put(player.getRealm(), party);
        }
    }

    synchronized private void joinParty(Session session)
    {
        if (sessionToPlayer.containsKey(session))
        {
            Client player = sessionToPlayer.get(session);
            Party party = realmToParties.get(player.getRealm());

            party.joinPlayer(player);
        }
    }

    synchronized private void disconnectFromParty(Client player)
    {
        if (player != null)
        {
            sessionToPlayer.remove(player.getSession());
            Party party = realmToParties.get(player.getRealm());

            if (party != null)
            {
                party.disconnectPlayer(player);

                if (party.isReady() && party.isPlayingEmpty())
                {
                    party.finish();
                }

                if (party.isEmpty())
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
        disconnectFromParty(sessionToPlayer.get(session));

        if (timedParty.isLocked() && timedParty.isPlayingEmpty())
        {
            timedParty.finish();
        }
    }

    synchronized private void reconnectEveryoneToTimed()
    {
        for (var party : realmToParties.values())
        {
            party.mute();

            if (!party.isFinished())
            {
                continue;
            }

            for (var player : party.idlePlayers.values())
            {
                timedParty.connectPlayer(player);
            }
        }
    }

    synchronized private void reconnectEveryoneFromTimed()
    {
        for (var party : realmToParties.values())
        {
            party.unMute();
            party.clear();
        }

        for (var player : timedParty.idlePlayers.values())
        {
            connectToParty(player);
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

    synchronized public void timedPartyIsWaiting()
    {
        canConnectToTimedParty = true;
        reconnectEveryoneToTimed();
    }

    synchronized public void timedPartyIsJoinable()
    {
        canJoinTimedParty = true;
    }

    synchronized public void timedPartyIsFinished()
    {
        canConnectToTimedParty = false;
        canJoinTimedParty = false;

        reconnectEveryoneFromTimed();
    }

    @Override
    public void updateTimer(String name, int timeLeft)
    {
        if (timedParty != null && !timedParty.isReady())
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
