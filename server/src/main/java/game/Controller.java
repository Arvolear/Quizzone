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
    private final ConcurrentHashMap<Session, String> playerToRealm;

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
        playerToRealm = new ConcurrentHashMap<>();
    }

    synchronized public void receiveMessage(Session player, String message)
    {
        if (!player.isOpen() || message.isEmpty())
        {
            return;
        }

        String[] lines = message.split("\\n");

        switch (lines[0])
        {
            case "connect":
            {
                if (lines.length > 2)
                {
                    if (canConnectToTimedParty)
                    {
                        String realm = lines[1];
                        String nick = lines[2];

                        if (!playerToRealm.containsKey(player))
                        {
                            playerToRealm.put(player, realm);
                        }

                        timedParty.connectPlayer(player, nick);
                    }
                    else
                    {
                        connectToParty(player, lines);
                    }
                }

                break;
            }
            case "join":
            {
                if (canJoinTimedParty)
                {
                    timedParty.joinPlayer(player);
                }
                else if (!canConnectToTimedParty)
                {
                    joinParty(player);
                }

                break;
            }
            default:
            {
                if (playerToRealm.containsKey(player))
                {
                    if (canJoinTimedParty)
                    {
                        timedParty.receive(player, message);
                    }
                    else
                    {
                        String realm = playerToRealm.get(player);
                        realmToParties.get(realm).receive(player, message);
                    }
                }

                break;
            }
        }
    }

    synchronized private void connectToParty(Session player, String[] lines)
    {
        String realm = lines[1];
        String nick = lines[2];

        if (!playerToRealm.containsKey(player))
        {
            playerToRealm.put(player, realm);
        }

        if (realmToParties.containsKey(realm))
        {
            Party party = realmToParties.get(realm);
            party.connectPlayer(player, nick);
        }
        else
        {
            Party party = new Party();
            party.loadCategory();
            party.connectPlayer(player, nick);

            realmToParties.put(realm, party);
        }
    }

    synchronized private void joinParty(Session player)
    {
        if (playerToRealm.containsKey(player))
        {
            String realm = playerToRealm.get(player);
            Party party = realmToParties.get(realm);

            party.joinPlayer(player);
        }
    }

    synchronized private void disconnectFromParty(Session player)
    {
        String realm = playerToRealm.get(player);

        if (realm != null)
        {
            playerToRealm.remove(player);
            Party party = realmToParties.get(realm);

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
                    realmToParties.remove(realm);
                }
            }
        }

        timedParty.disconnectPlayer(player);
    }

    synchronized public void disconnect(Session player)
    {
        disconnectFromParty(player);

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

            for (var player : party.idlePlayers.keySet())
            {
                timedParty.connectPlayer(player, party.idlePlayers.get(player));
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

        for (var player : timedParty.idlePlayers.keySet())
        {
            String nick = timedParty.idlePlayers.get(player);
            String realm = playerToRealm.get(player);

            connectToParty(player, new String[]{"connect", realm, nick});
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
