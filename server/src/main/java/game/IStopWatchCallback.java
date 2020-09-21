package game;

public interface IStopWatchCallback
{
    void updateTimer(String name, int timeLeft);
    void onTimerEnd(String name);
}
