package server;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.websocket.server.WebSocketHandler;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;

public class DappServer
{
    private final Server server;

    private static final int BARE_PORT = 8080;

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