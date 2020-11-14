package party_related;

import game.Client;

import java.util.ArrayList;
import java.util.Random;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentHashMap;

public class RandomParty extends AbstractParty
{
    protected RandomCategory category;

    protected PartyMessagesHandler messagesHandler;

    protected Random random;

    protected BoostersHandler boostersHandler;

    protected boolean questionsLoaded = false;

    protected boolean canHost = true;
    protected boolean canJoin = false;
    protected boolean full = false;
    protected boolean started = false;
    protected boolean reconnecting = false;

    protected boolean nowQuestion = false;
    protected boolean nowAnswer = false;
    protected boolean restart = false;

    public RandomParty()
    {
        super();

        boostersHandler = new BoostersHandler(this);
        random = new Random();

        loadMessages();
        loadConstants();
    }

    synchronized public void loadCategory()
    {
        ArrayList<RandomCategory> categories = sqlAccess.getRandomCategories();

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

    @Override
    synchronized public void logResults()
    {
        String partyBest = getPartyBestSortedJson();

        quizLogger.logResults("random_quiz_results", partyBest);
        elasticLogger.log("random_quiz_results", partyBest);
    }

    @Override
    synchronized public void connectPlayer(Client player)
    {
        if (idlePlayers.containsKey(player))
        {
            return;
        }

        idlePlayers.put(player, player);

        send(player, messagesHandler.getLifetimeBestResponse(player));

        if (muted)
        {
            return;
        }

        if (!started)
        {
            if (full)
            {
                send(player, messagesHandler.getFullMessage());
            }
            else if (canHost)
            {
                send(player, messagesHandler.getHostMessage());
            }
            else if (canJoin)
            {
                send(player, messagesHandler.getJoinableMessage(category.getAlias()));
            }
        }
        else
        {
            send(player, messagesHandler.getLockedMessage());

            if (nowQuestion)
            {
                send(player, messagesHandler.getNextMessage());
            }
            else if (nowAnswer)
            {
                if (currentQuestionAnswers.size() == 4)
                {
                    send(player, messagesHandler.getAnswerStatisticsMessage(currentQuestionAnswers));
                }
            }
            else if (restart)
            {
                send(player, messagesHandler.getTopPartyResponse(player, true));
            }
        }
    }

    @Override
    synchronized public void joinPlayer(Client player)
    {
        if (full || started || playingPlayers.containsKey(player) || idlePlayers.get(player) == null)
        {
            return;
        }

        playingPlayers.put(player, idlePlayers.get(player));
        idlePlayers.remove(player);
        totalCorrect.put(player, 0);

        send(player, messagesHandler.getHideMessage("control_buttons"));

        if (playingPlayers.size() == 1)
        {
            canHost = false;
            canJoin = true;

            broadcast(idlePlayers, messagesHandler.getJoinableMessage(category.getAlias()));

            questionnaire.loadQuestions(category.getCategory());
            questionsLoaded = true;
        }

        if (playingPlayers.size() >= startGameThreshold)
        {
            quizTimer.updateTime(startTimeout);

            broadcast(playingPlayers, messagesHandler.getCountdownStartMessage(category.getAlias()));
        }
        else
        {
            broadcast(playingPlayers, messagesHandler.getCountdownWaitMessage(category.getAlias()));
        }

        if (playingPlayers.size() >= maxPlayingSize)
        {
            full = true;
            canHost = false;
            canJoin = false;

            broadcast(idlePlayers, messagesHandler.getFullMessage());
        }

        send(player, messagesHandler.getSuccessfulJoinMessage());
    }

    @Override
    synchronized public void disconnectPlayer(Client player)
    {
        playingPlayers.remove(player);
        idlePlayers.remove(player);
        blackList.remove(player);

        player.clear();

        if (!questionsLoaded || started)
        {
            return;
        }

        full = false;

        if (playingPlayers.isEmpty())
        {
            canHost = true;
            canJoin = false;

            broadcast(idlePlayers, messagesHandler.getHostMessage());
        }
        else
        {
            canHost = false;
            canJoin = true;

            broadcast(idlePlayers, messagesHandler.getJoinableMessage(category.getAlias()));
        }

        if (playingPlayers.size() >= startGameThreshold)
        {
            broadcast(playingPlayers, messagesHandler.getCountdownStartMessage(category.getAlias()));
        }
        else
        {
            quizTimer.updateTime(-1);

            broadcast(playingPlayers, messagesHandler.getCountdownWaitMessage(category.getAlias()));
        }
    }

    @Override
    synchronized public void updateTimer(String name, int timeLeft)
    {
        if (!name.equals(quizTimer.getName()) || quizTimer.isStopped())
        {
            return;
        }

        broadcastAll(messagesHandler.getTimerUpdateMessage(timeLeft));
    }

    @Override
    synchronized public void onTimerEnd(String name)
    {
        if (!name.equals(quizTimer.getName()) || quizTimer.isStopped())
        {
            return;
        }

        if (!started)
        {
            canJoin = false;
            canHost = false;
            started = true;
            nowQuestion = true;

            sendStartMessages();
            boostersHandler.handleBoostersMessages();

            quizTimer.updateTime(questionDuration);
        }
        else if (nowQuestion)
        {
            nowQuestion = false;
            nowAnswer = true;

            broadcast(playingPlayers, messagesHandler.getGetMessage());
            broadcast(playingPlayers, messagesHandler.getHideMessage("autocomplete"));
            broadcast(playingPlayers, messagesHandler.getHideMessage("autocut"));

            quizTimer.updateTime(answerDuration);
        }
        else if (nowAnswer)
        {
            nowQuestion = true;
            nowAnswer = false;

            questionnaire.toNextQuestion();

            blackList.clear();

            if (questionnaire.isFinished())
            {
                sendFinishMessages();

                restart = true;
                nowQuestion = false;

                quizTimer.updateTime(endTimeout);
            }
            else
            {
                broadcastAll(messagesHandler.getNextMessage());
                boostersHandler.handleBoostersMessages();

                quizTimer.updateTime(questionDuration);
            }

            currentQuestionAnswers.clear();
        }
        else if (restart)
        {
            finish();
        }
    }

    synchronized public void receive(Client player, String message)
    {
        String[] lines = message.split("\\n");

        if (lines[0].equals("buy_boosters"))
        {
            boostersHandler.handleBuy(player, lines, nowQuestion);
            return;
        }

        if (lines[0].equals("use_autocomplete") || lines[0].equals("use_autocut"))
        {
            boostersHandler.handleUse(player, lines, nowQuestion);
            return;
        }

        if (!nowAnswer || !playingPlayers.contains(player))
        {
            return;
        }

        if (currentQuestionAnswers.size() < 4)
        {
            for (int i = 0; i < 4; i++)
            {
                currentQuestionAnswers.add(0);
            }

            broadcast(idlePlayers, messagesHandler.getAnswerStatisticsSoundMessage());
        }

        int questionNum = Integer.parseInt(lines[1]);
        int answer = Integer.parseInt(lines[2]);

        if (!blackList.containsKey(player))
        {
            if (questionNum == questionnaire.getCurrentQuestionNumber() && questionnaire.isCorrect(answer))
            {
                totalCorrect.put(player, totalCorrect.get(player) + 1);

                send(player, messagesHandler.getCorrectAnswerMessage());
            }
            else
            {
                send(player, messagesHandler.getWrongAnswerMessage());
            }

            blackList.put(player, playingPlayers.get(player));

            if (answer >= 1 && answer <= 4)
            {
                currentQuestionAnswers.set(answer - 1, currentQuestionAnswers.get(answer - 1) + 1);
            }

            broadcast(idlePlayers, messagesHandler.getAnswerStatisticsMessage(currentQuestionAnswers));
        }
    }

    synchronized protected void sendStartMessages()
    {
        broadcast(playingPlayers, messagesHandler.getStartPlayingMessage());
        broadcast(idlePlayers, messagesHandler.getStartIdleMessage());
    }

    synchronized private void sendFinishMessages()
    {
        for (var player : playingPlayers.values())
        {
            send(player, messagesHandler.getShowMessage(player, "control_buttons"));
            send(player, messagesHandler.getHideMessage("autocomplete"));
            send(player, messagesHandler.getHideMessage("autocut"));
        }

        broadcastAll(messagesHandler.getFinishMessage());

        for (var player : playingPlayers.values())
        {
            send(player, messagesHandler.getTopPartyResponse(player, false));
            send(player, messagesHandler.getApplauds(player, false));
        }

        for (var player : idlePlayers.values())
        {
            send(player, messagesHandler.getTopPartyResponse(player, true));
            send(player, messagesHandler.getApplauds(player, true));
        }
    }

    synchronized public void finish()
    {
        if (!started)
        {
            return;
        }

        logResults();

        nowQuestion = false;
        nowAnswer = false;
        restart = false;

        ConcurrentHashMap<Client, Client> tmpPlayers = new ConcurrentHashMap<>();

        blackList.clear();

        quizTimer.updateTime(-1);
        loadCategory();

        for (var player : playingPlayers.keySet())
        {
            tmpPlayers.put(player, player);
        }

        for (var player : idlePlayers.keySet())
        {
            tmpPlayers.put(player, player);
        }

        idlePlayers.clear();
        playingPlayers.clear();
        totalCorrect.clear();

        questionsLoaded = false;
        canHost = true;
        canJoin = false;
        full = false;
        started = false;

        reconnecting = true;

        for (var player : tmpPlayers.keySet())
        {
            player.clear();

            try
            {
                if (player.getSession().isOpen())
                {
                    player.getSession().getRemote().sendString(messagesHandler.getClearMessage());
                }
            }
            catch (Exception ex)
            {
                ex.printStackTrace();
            }

            connectPlayer(player);
        }

        reconnecting = false;
    }

    @Override
    public PartyMessagesHandler getMessagesHandler()
    {
        return messagesHandler;
    }

    @Override
    public boolean isQuestionsLoaded()
    {
        return questionsLoaded;
    }

    @Override
    public boolean isStarted()
    {
        return started;
    }

    public boolean isReconnecting()
    {
        return reconnecting;
    }
}
