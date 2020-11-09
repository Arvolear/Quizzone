package party_related;

import game.Client;
import game.IStopWatchCallback;
import game.StopWatch;
import log.QuizLogger;
import sql.SQLAccess;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;

abstract public class AbstractParty implements IStopWatchCallback
{
    public static final int LIFETIME_BEST_LIMIT = 9;
    public static final int PARTY_TOP_LIMIT = 5;

    public static final int AUTOCOMPLETE_PRICE = 0;
    public static final int AUTOCUT_PRICE = 0;

    protected final QuizLogger logger;

    protected final Questionnaire questionnaire;
    protected final SQLAccess sqlAccess;

    protected final ConcurrentHashMap<Client, Client> idlePlayers;
    protected final ConcurrentHashMap<Client, Client> playingPlayers;

    protected final ConcurrentHashMap<Client, Integer> totalCorrect;
    protected final ConcurrentHashMap<Client, Client> blackList;

    protected final ArrayList<Integer> currentQuestionAnswers;

    protected final StopWatch<AbstractParty> quizTimer;

    protected int maxPlayingSize;
    protected int startTimeout;
    protected int startGameThreshold;
    protected int questionDuration;
    protected int answerDuration;
    protected int endTimeout;

    protected boolean muted = false;

    public AbstractParty()
    {
        logger = QuizLogger.getInstance();

        idlePlayers = new ConcurrentHashMap<>();
        playingPlayers = new ConcurrentHashMap<>();

        totalCorrect = new ConcurrentHashMap<>();
        blackList = new ConcurrentHashMap<>();

        currentQuestionAnswers = new ArrayList<>();

        questionnaire = new Questionnaire();
        sqlAccess = SQLAccess.getInstance();

        quizTimer = new StopWatch<>(this, "quizTimer");
    }

    @Override
    abstract public void updateTimer(String name, int timeLeft);

    @Override
    abstract public void onTimerEnd(String name);

    abstract public void connectPlayer(Client player);
    abstract public void joinPlayer(Client player);
    abstract public void disconnectPlayer(Client player);

    protected void updateBestFor(Client player)
    {
        if (playingPlayers.containsKey(player))
        {
            sqlAccess.addToLifetimeBest(player.getNick(), totalCorrect.get(player));
        }
    }

    synchronized public void broadcastAll(String response)
    {
        broadcast(playingPlayers, response);
        broadcast(idlePlayers, response);
    }

    synchronized public void broadcastAll(Function<Client, String> function)
    {
        broadcast(playingPlayers, function);
        broadcast(idlePlayers, function);
    }

    synchronized public void broadcast(ConcurrentHashMap<Client, Client> map, Function<Client, String> function)
    {
        for (var player : map.values())
        {
            send(player, function.apply(player));
        }
    }

    synchronized public void broadcast(ConcurrentHashMap<Client, Client> map, String response)
    {
        for (var player : map.values())
        {
            send(player, response);
        }
    }

    synchronized public void send(Client player, String message)
    {
        try
        {
            if (player.getSession().isOpen())
            {
                player.getSession().getRemote().sendString(message);

                logger.log("SENT: " + message + " TO: " +
                        (idlePlayers.get(player) == null ?
                                playingPlayers.get(player).getNick() :
                                idlePlayers.get(player).getNick()));
            }
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }
    }

    public Questionnaire getQuestionnaire()
    {
        return questionnaire;
    }

    public ConcurrentHashMap<Client, Client> getIdlePlayers()
    {
        return idlePlayers;
    }

    public ConcurrentHashMap<Client, Client> getPlayingPlayers()
    {
        return playingPlayers;
    }

    public void mute()
    {
        this.muted = true;
    }

    public void unMute()
    {
        this.muted = false;
    }

    public boolean isCompletelyEmpty()
    {
        return playingPlayers.isEmpty() && idlePlayers.isEmpty();
    }

    public boolean isPlayingEmpty()
    {
        return playingPlayers.isEmpty();
    }

    abstract public PartyMessagesHandler getMessagesHandler();

    abstract public boolean isQuestionsLoaded();
    abstract public boolean isStarted();

    synchronized public void clear()
    {
        idlePlayers.clear();
        playingPlayers.clear();
        totalCorrect.clear();
        blackList.clear();

        quizTimer.updateTime(-1);
    }

    synchronized public void close()
    {
        clear();
        quizTimer.stop();
    }
}
