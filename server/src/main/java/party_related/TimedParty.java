package party_related;

import game.Client;
import game.Controller;
import game.StopWatch;

import java.util.*;

public class TimedParty extends Party
{
    private final Controller controller;

    private final StopWatch<TimedParty> countdownTimer;
    private Calendar startTime;

    private int blockOtherPartiesTimeout;

    public TimedParty(Controller controller)
    {
        super();

        this.controller = controller;
        countdownTimer = new StopWatch<>(this, "timedQuizTimer");
    }

    synchronized private void finishLoadCategory()
    {
        ready = false;
        category = null;
        countdownTimer.updateTime(-1);

        TimedPartyMessagesHandler timedMessagesHandler = (TimedPartyMessagesHandler) messagesHandler;
        String response = timedMessagesHandler.getTimedClearMessage();

        controller.broadcastAll(response);
    }

    @Override
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

        category = categories.get(leastIndex);
        startTime = categories.get(leastIndex).getStartTime();

        countdownTimer.updateTime((int) getTimeToStart());
    }

    @Override
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

    @Override
    protected void loadMessages()
    {
        messagesHandler = new TimedPartyMessagesHandler(this);
    }

    @Override
    synchronized public void connectPlayer(Client player)
    {
        super.connectPlayer(player);

        TimedPartyMessagesHandler timedMessagesHandler = (TimedPartyMessagesHandler) messagesHandler;

        if (category != null && ready)
        {
            String response = timedMessagesHandler.getTimedQuizTimerResponse(-1, category.getAlias());
            send(player, response);
        }
    }

    @Override
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

        if (playingPlayers.size() == startGameThreshold)
        {
            questionTimer.updateTime(startTimeout);
        }

        if (playingPlayers.size() >= startGameThreshold)
        {
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

            response = messagesHandler.getLockedMessage();
            broadcast(idlePlayers, response);
        }
    }

    @Override
    synchronized public void disconnectPlayer(Client player)
    {
        updateBestFor(player);

        playingPlayers.remove(player);
        totalCorrect.remove(player);
        idlePlayers.remove(player);
        blackList.remove(player);

        String response;

        if (ready && !started)
        {
            locked = false;

            if (playingPlayers.size() >= startGameThreshold)
            {
                response = messagesHandler.getCountdownStartMessage(category.getAlias());
            }
            else
            {
                joinable = true;

                questionTimer.updateTime(-1);
                response = messagesHandler.getCountdownWaitMessage(category.getAlias());
            }

            broadcast(playingPlayers, response);

            if (joinable)
            {
                response = messagesHandler.getJoinableMessage();
            }
            else
            {
                response = messagesHandler.getHostMessage();
            }

            broadcast(idlePlayers, response);
        }
    }

    @Override
    synchronized public void updateTimer(String name, int timeLeft)
    {
        super.updateTimer(name, timeLeft);

        if (!name.equals(countdownTimer.getName()) || countdownTimer.isStopped())
        {
            return;
        }

        if (timeLeft <= blockOtherPartiesTimeout)
        {
            controller.timedPartyIsWaiting();
            broadcast(idlePlayers, messagesHandler.getHostMessage());
        }

        TimedPartyMessagesHandler timedMessagesHandler = (TimedPartyMessagesHandler) messagesHandler;

        if (category != null)
        {
            String response = timedMessagesHandler.getTimedQuizTimerResponse(timeLeft, category.getAlias());
            controller.broadcastAll(response);
        }
    }

    @Override
    synchronized public void onTimerEnd(String name)
    {
        super.onTimerEnd(name);

        if (!name.equals(countdownTimer.getName()) || countdownTimer.isStopped())
        {
            return;
        }

        countdownTimer.updateTime(-1);

        if (category != null)
        {
            questionnaire.loadQuestions(category.getCategory());
            controller.timedPartyIsJoinable();
            setJoinable();
        }
    }

    @Override
    synchronized public void finish()
    {
        mute();

        finishLoadCategory();

        super.finish();
        controller.timedPartyIsFinished();

        unMute();
    }

    synchronized private void setJoinable()
    {
        ready = true;
        joinable = true;

        String response = messagesHandler.getJoinableMessage();
        broadcast(idlePlayers, response);

        TimedPartyMessagesHandler timedMessagesHandler = (TimedPartyMessagesHandler) messagesHandler;
        response = timedMessagesHandler.getTimedQuizTimerResponse(-1, category.getAlias());
        controller.broadcastAll(response);
    }

    private long getTimeToStart()
    {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        Date curDate = Calendar.getInstance().getTime();

        Date startDate = startTime.getTime();

        long timeout = (startDate.getTime() - curDate.getTime()) / 1000L;

        return Math.max(0L, timeout);
    }
}
