package server;

import org.eclipse.jetty.http.HttpVersion;
import org.eclipse.jetty.server.*;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.util.ssl.SslContextFactory;
import org.eclipse.jetty.websocket.server.WebSocketHandler;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;

import java.util.ArrayList;
import java.util.List;

public class DappServer
{
    private final Server server;

    private static final String HOST = "localhost";
    private static final int BARE_PORT = 8080;
    private static final int SSL_PORT = 8443;

    private static final String KEY_STORE_PATH = "./keystore.jks";
    private static final String KEY_STORE_PASSWORD = "Qwerty123";
    private static final String KEY_MANAGER_PASSWORD = "Qwerty123";

    public DappServer()
    {
        server = new Server();

        addWebSocket(DappServerSocket.class);

        initializeBare();
    }

    public void addWebSocket(final Class<?> webSocket)
    {
        WebSocketHandler wsHandler = new WebSocketHandler()
        {
            @Override
            public void configure(WebSocketServletFactory webSocketServletFactory)
            {
                webSocketServletFactory.register(webSocket);
            }
        };

        server.setHandler(wsHandler);
    }

    private void initializeBare()
    {
        ServerConnector connector = new ServerConnector(server);
        connector.setPort(BARE_PORT);

        server.addConnector(connector);
    }

    public void start() throws Exception
    {
        System.err.println("POWERING ON\n");

        server.start();
        server.join();

        System.err.println("SHUTTING DOWN\n");
    }

    public void stop() throws Exception
    {
        server.stop();
        server.join();
    }
}