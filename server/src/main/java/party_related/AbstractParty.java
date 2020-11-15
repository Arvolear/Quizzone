package party_related;

import game.Client;
import game.IStopWatchCallback;
import game.StopWatch;
import log.ElasticLogger;
import log.QuizLogger;
import sql.SQLAccess;

import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;

abstract public class AbstractParty implements IStopWatchCallback
{
    public static final int LIFETIME_BEST_LIMIT = 9;
    public static final int PARTY_TOP_LIMIT = 5;

    public static final int AUTOCOMPLETE_PRICE = 50;
    public static final int AUTOCUT_PRICE = 25;

    protected final QuizLogger quizLogger;
    protected final ElasticLogger elasticLogger;

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
        quizLogger = QuizLogger.getInstance();
        elasticLogger = ElasticLogger.getInstance();

        idlePlayers = new ConcurrentHashMap<>();
        playingPlayers = new ConcurrentHashMap<>();

        totalCorrect = new ConcurrentHashMap<>();
        blackList = new ConcurrentHashMap<>();

        currentQuestionAnswers = new ArrayList<>();

        questionnaire = new Questionnaire();
        sqlAccess = SQLAccess.getInstance();

        quizTimer = new StopWatch<>(this, "quizTimer");
    }

    synchronized public String getPartyBestSortedJson()
    {
        StringBuilder builder = new StringBuilder();
        ArrayList<Map.Entry<Client, Integer>> topParty = new ArrayList<>(totalCorrect.entrySet());

        topParty.sort((left, right) ->
        {
            int res = right.getValue() - left.getValue();

            return res == 0 ?
                    left.getKey().getNick().compareTo(right.getKey().getNick()) :
                    res;
        });

        int place = 1;

        builder.append("{\n");

        for (var pair : topParty)
        {
            builder.append("\"").append(place).append("\": ").
                    append("\"").
                    append(pair.getKey().getNick()).
                    append(" ").
                    append(pair.getKey().getWallet()).
                    append(" -----> ").append(pair.getValue()).
                    append("/").
                    append(getQuestionnaire().getTotalNumber()).
                    append("\"");

            if (place < topParty.size())
            {
                builder.append(",\n");
            }

            place++;
        }

        builder.append("\n}");

        return builder.toString();
    }

    abstract public void logResults();

    @Override
    abstract public void updateTimer(String name, int timeLeft);

    @Override
    abstract public void onTimerEnd(String name);

    abstract public void connectPlayer(Client player);
    abstract public void joinPlayer(Client player);
    abstract public void disconnectPlayer(Client player);

    synchronized protected void updateBestFor(Client player)
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

                quizLogger.log("SENT: " + message + " TO: " +
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

    synchronized public void mute()
    {
        this.muted = true;
    }

    synchronized public void unMute()
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
