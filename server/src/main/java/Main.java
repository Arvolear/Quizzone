import log.ExceptionHandler;
import server.DappServer;

public class Main
{
    public static void main(String args[]) throws Exception
    {
        Thread.setDefaultUncaughtExceptionHandler(new ExceptionHandler());

        DappServer server = new DappServer();
        server.start();
    }
}
