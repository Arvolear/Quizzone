package party_related;

import game.Client;
import game.Controller;
import game.StopWatch;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class TimedParty extends AbstractParty
{
    protected final Controller controller;

    protected final StopWatch<TimedParty> countdownTimer;
    protected Calendar startTime;

    protected TimedCategory category;
    protected TimedPartyMessagesHandler timedMessagesHandler;

    protected BoostersHandler boostersHandler;

    protected int blockOtherPartiesTimeout;

    protected boolean shouldConnect;
    protected boolean shouldJoin;

    protected boolean questionsLoaded = false;

    protected boolean canAwait = false;
    protected boolean canJoin = false;
    protected boolean full = false;
    protected boolean started = false;

    protected boolean nowQuestion = false;
    protected boolean nowAnswer = false;
    protected boolean restart = false;

    protected boolean sendAwaitingOnce = true;

    public TimedParty(Controller controller)
    {
        super();

        this.controller = controller;

        countdownTimer = new StopWatch<>(this, "timedQuizTimer");
        boostersHandler = new BoostersHandler(this);

        loadMessages();
        loadConstants();
    }

    synchronized private void finishLoadCategory()
    {
        questionsLoaded = false;
        canAwait = false;
        category = null;
        sendAwaitingOnce = true;

        countdownTimer.updateTime(-1);

        String response = timedMessagesHandler.getTimedClearMessage();

        controller.broadcastAll(response);
    }

    synchronized public void loadCategory()
    {
        ArrayList<TimedCategory> categories = sqlAccess.getTimedCategories();

        if (categories.isEmpty())
        {
            if (category != null)
            {
                finishLoadCategory();
            }

            return;
        }

        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        Date curDate = Calendar.getInstance().getTime();

        long leastTime = Long.MAX_VALUE;
        int leastIndex = -1;

        for (int i = 0; i < categories.size(); i++)
        {
            Date nextDate = categories.get(i).getStartTime().getTime();
            long timeToNextQuiz = (nextDate.getTime() - curDate.getTime()) / 1000L;

            if (timeToNextQuiz < -(12 * 60 * 60)) // 12 hours after the start
            {
                sqlAccess.moveCategoryFromTimedToFinished(categories.get(i));
            }
            else if (timeToNextQuiz < 0)
            {
                if (category == null || !category.getCategory().equals(categories.get(i).getCategory()))
                {
                    sqlAccess.moveCategoryFromTimedToFinished(categories.get(i));
                }
                else // current category
                {
                    leastTime = timeToNextQuiz;
                    leastIndex = i;
                }
            }
            else
            {
                if (timeToNextQuiz < leastTime)
                {
                    leastTime = timeToNextQuiz;
                    leastIndex = i;
                }
            }
        }

        if (leastIndex == -1)
        {
            finishLoadCategory();
            return;
        }

        if (category != null && category.getCategory().equals(categories.get(leastIndex).getCategory()))
        {
            return;
        }

        sendAwaitingOnce = true;
        questionsLoaded = true;
        category = categories.get(leastIndex);
        startTime = categories.get(leastIndex).getStartTime();

        countdownTimer.updateTime((int) getTimeToStart());
    }

    protected void loadConstants()
    {
        TreeMap<String, Integer> constants = sqlAccess.getTimedConstants();

        maxPlayingSize = constants.get("max_playing_size");
        blockOtherPartiesTimeout = constants.get("block_other_parties_timeout");
        startGameThreshold = constants.get("start_game_threshold");
        startTimeout = constants.get("start_timeout");
        questionDuration = constants.get("question_duration");
        answerDuration = constants.get("answer_duration");
        endTimeout = constants.get("end_timeout");
    }

    protected void loadMessages()
    {
        timedMessagesHandler = new TimedPartyMessagesHandler(this);
    }

    @Override
    synchronized public void connectPlayer(Client player)
    {
        if (idlePlayers.containsKey(player))
        {
            return;
        }

        idlePlayers.put(player, player);

        send(player, timedMessagesHandler.getLifetimeBestResponse(player));

        if (category != null)
        {
            send(player, timedMessagesHandler.getTimedQuizTimerResponse(-1, category.getAlias()));
        }

        if (muted)
        {
            return;
        }

        if (!started)
        {
            if (full)
            {
                send(player, timedMessagesHandler.getFullMessage());
            }
            else if (canAwait)
            {
                send(player, timedMessagesHandler.getAwaitMessage());
            }
            else if (canJoin && category != null)
            {
                send(player, timedMessagesHandler.getJoinableMessage(category.getAlias()));
            }
        }
        else
        {
            send(player, timedMessagesHandler.getLockedMessage());

            if (nowQuestion)
            {
                send(player, timedMessagesHandler.getNextMessage());
            }
            else if (nowAnswer)
            {
                if (currentQuestionAnswers.size() == 4)
                {
                    send(player, timedMessagesHandler.getAnswerStatisticsMessage(currentQuestionAnswers));
                }
            }
            else if (restart)
            {
                send(player, timedMessagesHandler.getTopPartyResponse(player, true));
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

        send(player, timedMessagesHandler.getHideMessage("control_buttons"));

        if (playingPlayers.size() == startGameThreshold)
        {
            quizTimer.updateTime(startTimeout);
        }

        if (playingPlayers.size() >= startGameThreshold)
        {
            broadcast(playingPlayers, timedMessagesHandler.getCountdownStartMessage(category.getAlias()));
        }
        else
        {
            broadcast(playingPlayers, timedMessagesHandler.getCountdownWaitMessage(category.getAlias()));
        }

        if (playingPlayers.size() >= maxPlayingSize)
        {
            full = true;
            canAwait = false;
            canJoin = false;

            broadcast(idlePlayers, timedMessagesHandler.getFullMessage());
        }

        send(player, timedMessagesHandler.getSuccessfulJoinMessage());
    }

    @Override
    synchronized public void disconnectPlayer(Client player)
    {
        updateBestFor(player);

        playingPlayers.remove(player);
        totalCorrect.remove(player);
        idlePlayers.remove(player);
        blackList.remove(player);

        if (canAwait || started)
        {
            return;
        }

        full = false;
        canJoin = true;

        if (playingPlayers.size() >= startGameThreshold)
        {
            broadcast(playingPlayers, timedMessagesHandler.getCountdownStartMessage(category.getAlias()));
        }
        else
        {
            quizTimer.updateTime(-1);

            broadcast(playingPlayers, timedMessagesHandler.getCountdownWaitMessage(category.getAlias()));
        }

        broadcast(idlePlayers, timedMessagesHandler.getJoinableMessage(category.getAlias()));
    }

    @Override
    synchronized public void updateTimer(String name, int timeLeft)
    {
        if (name.equals(quizTimer.getName()) && !quizTimer.isStopped())
        {
            broadcastAll(timedMessagesHandler.getTimerUpdateMessage(timeLeft));
        }
        else if (name.equals(countdownTimer.getName()) && !countdownTimer.isStopped())
        {
            if (timeLeft <= blockOtherPartiesTimeout)
            {
                shouldConnect = true;
                canAwait = true;

                controller.reconnectEveryoneToTimed();

                if (sendAwaitingOnce)
                {
                    broadcast(idlePlayers, timedMessagesHandler.getAwaitMessage());
                    sendAwaitingOnce = false;
                }
            }

            if (category != null)
            {
                controller.broadcastAll(timedMessagesHandler.getTimedQuizTimerResponse(timeLeft, category.getAlias()));
            }
        }
    }

    @Override
    synchronized public void onTimerEnd(String name)
    {
        if (name.equals(quizTimer.getName()) && !quizTimer.isStopped())
        {
            if (!started)
            {
                canJoin = false;
                canAwait = false;
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

                broadcast(playingPlayers, timedMessagesHandler.getGetMessage());
                broadcast(playingPlayers, timedMessagesHandler.getHideMessage("autocomplete"));
                broadcast(playingPlayers, timedMessagesHandler.getHideMessage("autocut"));

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
                    broadcastAll(timedMessagesHandler.getNextMessage());
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
        else if (name.equals(countdownTimer.getName()) && !countdownTimer.isStopped())
        {
            countdownTimer.updateTime(-1);

            if (category != null)
            {
                questionnaire.loadQuestions(category.getCategory());
                setJoinable();
            }
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

            broadcast(idlePlayers, timedMessagesHandler.getAnswerStatisticsSoundMessage());
        }

        int questionNum = Integer.parseInt(lines[1]);
        int answer = Integer.parseInt(lines[2]);

        if (!blackList.containsKey(player))
        {
            if (questionNum == questionnaire.getCurrentQuestionNumber() && questionnaire.isCorrect(answer))
            {
                totalCorrect.put(player, totalCorrect.get(player) + 1);

                send(player, timedMessagesHandler.getCorrectAnswerMessage());
            }
            else
            {
                send(player, timedMessagesHandler.getWrongAnswerMessage());
            }

            blackList.put(player, playingPlayers.get(player));

            if (answer >= 1 && answer <= 4)
            {
                currentQuestionAnswers.set(answer - 1, currentQuestionAnswers.get(answer - 1) + 1);
            }

            broadcast(idlePlayers, timedMessagesHandler.getAnswerStatisticsMessage(currentQuestionAnswers));
        }
    }

    synchronized protected void sendStartMessages()
    {
        broadcast(playingPlayers, timedMessagesHandler.getStartPlayingMessage());
        broadcast(idlePlayers, timedMessagesHandler.getStartIdleMessage());

        if (category != null)
        {
            controller.broadcastAll(timedMessagesHandler.getTimedQuizTimerResponse(-1, category.getAlias()));
        }
    }

    synchronized private void sendFinishMessages()
    {
        for (var player : playingPlayers.values())
        {
            send(player, timedMessagesHandler.getShowMessage(player, "control_buttons"));
            send(player, timedMessagesHandler.getHideMessage("autocomplete"));
            send(player, timedMessagesHandler.getHideMessage("autocut"));
        }

        broadcastAll(timedMessagesHandler.getFinishMessage());

        for (var player : playingPlayers.values())
        {
            send(player, timedMessagesHandler.getTopPartyResponse(player, false));
            send(player, timedMessagesHandler.getApplauds(player, false));
        }

        for (var player : idlePlayers.values())
        {
            send(player, timedMessagesHandler.getTopPartyResponse(player, true));
            send(player, timedMessagesHandler.getApplauds(player, true));
        }
    }

    synchronized public void finish()
    {
        if (!started)
        {
            return;
        }

        mute();
        finishLoadCategory();

        for (var player : playingPlayers.keySet())
        {
            updateBestFor(player);
        }

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

        canAwait = false;
        canJoin = false;

        full = false;
        started = false;

        shouldConnect = false;
        shouldJoin = false;

        for (var player : tmpPlayers.keySet())
        {
            player.clear();

            try
            {
                if (player.getSession().isOpen())
                {
                    player.getSession().getRemote().sendString(timedMessagesHandler.getClearMessage());
                }
            }
            catch (Exception ex)
            {
                ex.printStackTrace();
            }

            connectPlayer(player);
        }

        controller.reconnectEveryoneFromTimed();

        unMute();
    }

    synchronized private void setJoinable()
    {
        shouldJoin = true;
        canAwait = false;
        canJoin = true;

        broadcast(idlePlayers, timedMessagesHandler.getJoinableMessage(category.getAlias()));
        controller.broadcastAll(timedMessagesHandler.getTimedQuizTimerResponse(-1, category.getAlias()));
    }

    private long getTimeToStart()
    {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        Date curDate = Calendar.getInstance().getTime();

        Date startDate = startTime.getTime();

        long timeout = (startDate.getTime() - curDate.getTime()) / 1000L;

        return Math.max(0L, timeout);
    }

    @Override
    public PartyMessagesHandler getMessagesHandler()
    {
        return timedMessagesHandler;
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

    public boolean isShouldConnect()
    {
        return shouldConnect;
    }

    public boolean isShouldJoin()
    {
        return shouldJoin;
    }
}
