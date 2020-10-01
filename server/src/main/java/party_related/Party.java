package party_related;

import game.Client;
import game.IStopWatchCallback;
import game.StopWatch;
import log.QuizLogger;
import sql.SQLAccess;

import java.util.ArrayList;
import java.util.Random;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;

public class Party implements IStopWatchCallback
{
    private final QuizLogger logger;

    public final Questionnaire questionnaire;
    public final SQLAccess sqlAccess;

    public final ConcurrentHashMap<Client, Client> idlePlayers;
    public final ConcurrentHashMap<Client, Client> playingPlayers;

    public final ConcurrentHashMap<Client, Integer> totalCorrect;
    public final ConcurrentHashMap<Client, Client> blackList;

    public static final int LIFETIME_BEST_LIMIT = 5;
    public static final int PARTY_TOP_LIMIT = 5;

    public static final int AUTOCOMPLETE_PRICE = 0;
    public static final int AUTOCUT_PRICE = 50;

    protected boolean ready;

    public RandomCategory category;

    public int maxPlayingSize;

    public int startTimeout;
    public int startGameThreshold;
    public int questionDuration;
    public int answerDuration;
    public int endTimeout;

    protected final StopWatch<Party> questionTimer;
    protected PartyMessagesHandler messagesHandler;

    protected boolean joinable = false;
    protected boolean locked = false;
    protected boolean started = false;
    protected boolean nowQuestion = false;
    protected boolean nowAnswer = false;
    protected boolean restart = false;

    protected boolean muteConnection = false;

    public Party()
    {
        logger = QuizLogger.getInstance();

        idlePlayers = new ConcurrentHashMap<>();
        playingPlayers = new ConcurrentHashMap<>();

        totalCorrect = new ConcurrentHashMap<>();
        blackList = new ConcurrentHashMap<>();

        questionTimer = new StopWatch<>(this, "randomQuizTimer");

        questionnaire = new Questionnaire();
        sqlAccess = SQLAccess.getInstance();

        loadMessages();
        loadConstants();
    }

    synchronized public void loadCategory()
    {
        ArrayList<RandomCategory> categories = sqlAccess.getRandomCategories();

        Random random = new Random();
        category = categories.get(random.nextInt(categories.size()));
    }

    protected void loadConstants()
    {
        TreeMap<String, Integer> constants = sqlAccess.getRandomConstants();

        maxPlayingSize = constants.get("max_playing_size");
        startGameThreshold = constants.get("start_game_threshold");
        startTimeout = constants.get("start_timeout");
        questionDuration = constants.get("question_duration");
        answerDuration = constants.get("answer_duration");
        endTimeout = constants.get("end_timeout");
    }

    protected void loadMessages()
    {
        messagesHandler = new PartyMessagesHandler(this);
    }

    protected void updateBestFor(Client player)
    {
        if (playingPlayers.containsKey(player))
        {
            sqlAccess.addToLifetimeBest(player.getNick(), totalCorrect.get(player));
        }
    }

    synchronized public void connectPlayer(Client player)
    {
        if (!idlePlayers.containsKey(player))
        {
            String response;

            idlePlayers.put(player, player);

            if (locked)
            {
                response = messagesHandler.getLockedMessage();
            }
            else if (joinable)
            {
                response = messagesHandler.getJoinableMessage();
            }
            else
            {
                response = messagesHandler.getHostMessage();
            }

            send(player, messagesHandler.getLifetimeBestResponse(player));

            if (!muteConnection)
            {
                send(player, response);
            }
        }
    }

    synchronized public void joinPlayer(Client player)
    {
        if (locked || started || playingPlayers.containsKey(player) || idlePlayers.get(player) == null)
        {
            return;
        }

        playingPlayers.put(player, idlePlayers.get(player));
        idlePlayers.remove(player);
        totalCorrect.put(player, 0);

        String response;

        if (playingPlayers.size() == 1)
        {
            joinable = true;

            response = messagesHandler.getJoinableMessage();
            broadcast(idlePlayers, response);

            questionnaire.loadQuestions(category.getCategory());

            ready = true;
        }

        if (playingPlayers.size() >= startGameThreshold)
        {
            questionTimer.updateTime(startTimeout);
            response = messagesHandler.getCountdownStartMessage(category.getAlias());
        }
        else
        {
            response = messagesHandler.getCountdownWaitMessage(category.getAlias());
        }

        broadcast(playingPlayers, response);

        if (playingPlayers.size() >= maxPlayingSize)
        {
            locked = true;
            joinable = false;

            response = messagesHandler.getLockedMessage();
            broadcast(idlePlayers, response);
        }
    }

    synchronized public void disconnectPlayer(Client player)
    {
        updateBestFor(player);
        player.clear();

        playingPlayers.remove(player);
        totalCorrect.remove(player);
        idlePlayers.remove(player);
        blackList.remove(player);

        String response;

        if (ready && !started)
        {
            locked = false;
            joinable = true;

            if (playingPlayers.isEmpty())
            {
                response = messagesHandler.getHostMessage();
            }
            else
            {
                response = messagesHandler.getJoinableMessage();
            }

            broadcast(idlePlayers, response);

            if (playingPlayers.size() >= startGameThreshold)
            {
                response = messagesHandler.getCountdownStartMessage(category.getAlias());
            }
            else
            {
                questionTimer.updateTime(-1);
                response = messagesHandler.getCountdownWaitMessage(category.getAlias());
            }

            broadcast(playingPlayers, response);
        }
    }

    @Override
    synchronized public void updateTimer(String name, int timeLeft)
    {
        if (!name.equals(questionTimer.getName()) || questionTimer.isStopped())
        {
            return;
        }

        String response = messagesHandler.getTimerUpdateMessage(timeLeft);

        if (!locked)
        {
            broadcastAll(response);
        }
        else
        {
            broadcast(playingPlayers, response);
        }
    }

    @Override
    synchronized public void onTimerEnd(String name)
    {
        if (!name.equals(questionTimer.getName()) || questionTimer.isStopped())
        {
            return;
        }

        if (!started)
        {
            started = true;
            locked = true;
            nowQuestion = true;

            broadcast(idlePlayers, messagesHandler.getLockedMessage());
            broadcast(playingPlayers, messagesHandler.getStartMessage());
            handleBoostersMessages();

            questionTimer.updateTime(questionDuration);
        }
        else if (nowQuestion)
        {
            nowQuestion = false;
            nowAnswer = true;

            broadcast(playingPlayers, messagesHandler.getGetMessage());
            broadcast(playingPlayers, messagesHandler.getHideMessage("autocomplete"));
            broadcast(playingPlayers, messagesHandler.getHideMessage("autocut"));

            questionTimer.updateTime(answerDuration);
        }
        else if (nowAnswer)
        {
            nowQuestion = true;
            nowAnswer = false;

            questionnaire.toNextQuestion();

            blackList.clear();

            if (questionnaire.isFinished())
            {
                String topPartyResponse = messagesHandler.getTopPartyResponse();

                broadcast(playingPlayers, messagesHandler::getFinishMessage);
                broadcast(playingPlayers, topPartyResponse);

                restart = true;
                nowQuestion = false;

                questionTimer.updateTime(endTimeout);
            }
            else
            {
                broadcast(playingPlayers, messagesHandler.getNextMessage());
                handleBoostersMessages();

                questionTimer.updateTime(questionDuration);
            }
        }
        else if (restart)
        {
            finish();
        }
    }

    synchronized public void receive(Client player, String message)
    {
        String[] lines = message.split("\\n");

        String response;

        if (lines[0].equals("buy_boosters"))
        {
            handleBuy(player, lines);
            return;
        }

        if (lines[0].equals("use_autocomplete") || lines[0].equals("use_autocut"))
        {
            handleUse(player, lines);
            return;
        }

        if (!nowAnswer)
        {
            return;
        }

        int questionNum = Integer.parseInt(lines[1]);
        int answer = Integer.parseInt(lines[2]);

        if (!blackList.containsKey(player))
        {
            if (questionNum == questionnaire.getCurrentQuestionNumber() && questionnaire.isCorrect(answer))
            {
                response = messagesHandler.getCorrectAnswerMessage();

                totalCorrect.put(player, totalCorrect.get(player) + 1);
            }
            else
            {
                response = messagesHandler.getWrongAnswerMessage();
            }

            blackList.put(player, playingPlayers.get(player));

            send(player, response);
        }
    }

    synchronized private void handleBoostersMessages()
    {
        for (var player : playingPlayers.values())
        {
            sendDisplayBooster(player);

            if (player.getAutocompleteLeft() > 0)
            {
                send(player, messagesHandler.getShowMessage(player, "autocomplete"));
            }

            if (player.getAutocutLeft() > 0)
            {
                send(player, messagesHandler.getShowMessage(player, "autocut"));
            }
        }
    }

    synchronized private void sendDisplayBooster(Client player)
    {
        if (player.autocompleteReady)
        {
            send(player, messagesHandler.getDisplayMessage("autocomplete"));
            player.autocompleteReady = false;
        }
        else if (player.autocutReady)
        {
            send(player, messagesHandler.getDisplayMessage("autocut"));
            player.autocutReady = false;
        }
    }

    synchronized private void handleUse(Client player, String[] lines)
    {
        if (lines[1].equals(player.getWallet()))
        {
            if (lines[0].equals("use_autocomplete"))
            {
                if (player.getAutocompleteLeft() > 0)
                {
                    player.decAutocomplete();
                    player.autocompleteReady = true;

                    broadcast(playingPlayers, messagesHandler.getHideMessage("autocomplete"));
                    broadcast(playingPlayers, messagesHandler.getHideMessage("autocut"));
                }
            }
            else
            {
                if (player.getAutocutLeft() > 0)
                {
                    player.decAutocut();
                    player.autocutReady = true;

                    broadcast(playingPlayers, messagesHandler.getHideMessage("autocomplete"));
                    broadcast(playingPlayers, messagesHandler.getHideMessage("autocut"));
                }
            }

            if (nowQuestion)
            {
                sendDisplayBooster(player);
            }
        }
    }

    synchronized private void handleBuy(Client player, String[] lines)
    {
        if (lines[3].equals(player.getWallet()))
        {
            int autocompleteNum = 0;
            int autocutNum = 0;

            try
            {
                autocompleteNum = Integer.parseInt(lines[1]);
                autocutNum = Integer.parseInt(lines[2]);

                if (autocompleteNum + autocutNum > 3)
                {
                    return;
                }
            }
            catch (Exception ex)
            {
                ex.printStackTrace();
            }

            player.setAutocompleteLeft(autocompleteNum);
            player.setAutocutLeft(autocutNum);

            if (nowQuestion)
            {
                handleBoostersMessages();
            }
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
                        (idlePlayers.get(player) == null ? playingPlayers.get(player).getNick() : idlePlayers.get(player).getNick()));
            }
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }
    }

    synchronized public void finish()
    {
        ready = false;
        locked = false;
        joinable = false;
        nowQuestion = false;
        nowAnswer = false;
        restart = false;

        blackList.clear();

        questionTimer.updateTime(-1);
        loadCategory();

        String response = messagesHandler.getClearMessage();

        for (var player : playingPlayers.keySet())
        {
            send(player, response);

            updateBestFor(player);
            connectPlayer(player);

            playingPlayers.remove(player);
            totalCorrect.remove(player);
        }

        for (var player : idlePlayers.keySet())
        {
            player.clear();

            send(player, response);
            idlePlayers.remove(player);
            connectPlayer(player);
        }

        started = false;
    }

    public boolean isEmpty()
    {
        return playingPlayers.isEmpty() && idlePlayers.isEmpty();
    }

    public boolean isPlayingEmpty()
    {
        return playingPlayers.isEmpty();
    }

    public void mute()
    {
        this.muteConnection = true;
    }

    public void unMute()
    {
        this.muteConnection = false;
    }

    public boolean isReady()
    {
        return ready;
    }

    public boolean isFinished()
    {
        return !started;
    }

    public boolean isLocked()
    {
        return locked;
    }

    synchronized public void close()
    {
        questionTimer.stop();
    }

    synchronized public void clear()
    {
        idlePlayers.clear();
        playingPlayers.clear();
        totalCorrect.clear();
        blackList.clear();

        questionTimer.updateTime(-1);
    }
}
