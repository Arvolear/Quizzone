package game;

import java.util.Timer;
import java.util.TimerTask;

public class StopWatch<T extends IStopWatchCallback>
{
    private final static int DELAY = 0;
    private int period = 1000;

    private final T callback;
    private Timer timer;

    private final String name;

    private int timeLeft;

    private boolean stopped = false;

    public StopWatch(T callback, String name)
    {
        this.callback = callback;
        this.name = name;

        runTimer(-1);
    }

    public StopWatch(T callback, String name, int period)
    {
        this.callback = callback;
        this.name = name;
        this.period = period;

        runTimer(-1);
    }

    public void runTimer(int timeLeft)
    {
        timer = new Timer(true);
        this.timeLeft = timeLeft;

        timer.scheduleAtFixedRate(new TimerTask()
        {
            @Override
            public void run()
            {
                decrease();
            }
        }, DELAY, period);
    }

    synchronized public void updateTime(int timeLeft)
    {
        this.timeLeft = timeLeft;
    }

    synchronized private void decrease()
    {
        if (timeLeft < 0)
        {
            return;
        }

        if (timeLeft == 0)
        {
            callback.onTimerEnd(name);
        }

        if (timeLeft < 0)
        {
            return;
        }

        callback.updateTimer(name, timeLeft);
        timeLeft--;
    }

    synchronized public void stop()
    {
        stopped = true;
        timer.cancel();

        timeLeft = -1;
    }

    public int getTimeLeft()
    {
        return timeLeft;
    }

    public boolean isStopped()
    {
        return stopped;
    }

    public String getName()
    {
        return name;
    }
}
