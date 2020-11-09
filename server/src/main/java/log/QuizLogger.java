package log;

import java.io.File;
import java.util.logging.*;

public class QuizLogger
{
    private static QuizLogger quizLogger;
    private static final String DIR_NAME = "log";
    private static final String LOG_NAME = "log";
    private static final int FILE_SIZE = 1024 * 1024; // 1 MB
    private static final int FILE_NUM = 4;

    private Logger logger;

    private FileHandler fileTxt;
    private SimpleFormatter formatterTxt;

    private QuizLogger()
    {
        try
        {
            logger = Logger.getLogger(Logger.GLOBAL_LOGGER_NAME);

            Logger rootLogger = Logger.getLogger("");
            Handler[] handlers = rootLogger.getHandlers();

            if (handlers[0] instanceof ConsoleHandler)
            {
                rootLogger.removeHandler(handlers[0]);
            }

            logger.setLevel(Level.INFO);

            File directory = new File(DIR_NAME);

            if (!directory.exists())
            {
                directory.mkdir();
            }

            fileTxt = new FileHandler(DIR_NAME + "/" + LOG_NAME, FILE_SIZE, FILE_NUM, true);

            formatterTxt = new SimpleFormatter();

            fileTxt.setFormatter(formatterTxt);
            logger.addHandler(fileTxt);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }
    }

    public static QuizLogger getInstance()
    {
        if (quizLogger == null)
        {
            quizLogger = new QuizLogger();
        }

        return quizLogger;
    }

    public void log(String message)
    {
        logger.info(message + "\n");
    }
}
