package server;

import game.Controller;
import log.QuizLogger;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

@WebSocket(maxIdleTime=1800000)
public class DappServerSocket
{
    private final Controller controller = Controller.getInstance();
    private final QuizLogger logger = QuizLogger.getInstance();

    @OnWebSocketMessage
    public void onText(Session session, String message)
    {
        logger.log("RECEIVED: " + message);

        controller.receiveMessage(session, message);
    }

    @OnWebSocketConnect
    public void onConnect(Session session)
    {
        logger.log("CONNECTED: " + session.getRemoteAddress().getHostString());
    }

    @OnWebSocketClose
    public void onClose(Session session, int status, String reason)
    {
        logger.log("CLOSED: " + session.getRemoteAddress().getHostString());

        controller.disconnect(session);
    }
}