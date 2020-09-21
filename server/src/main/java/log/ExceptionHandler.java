package log;

import java.io.PrintWriter;
import java.io.StringWriter;

public class ExceptionHandler implements Thread.UncaughtExceptionHandler
{
    private final QuizLogger logger = QuizLogger.getInstance();

    @Override
    public void uncaughtException(Thread thread, Throwable throwable)
    {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        throwable.printStackTrace(pw);

        logger.log("EXCEPTION:\n" + thread.getName() + " " + sw.toString());
    }
}
