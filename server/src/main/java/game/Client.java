package game;


import org.eclipse.jetty.websocket.api.Session;

import java.util.Objects;

public class Client
{
    private Session session;
    private String realm;
    private String wallet;
    private String nick;

    private int currAutocomplete;
    private int currAutocut;

    public boolean autocompleteReady;
    public boolean autocutReady;

    public Client(Session session, String realm, String wallet, String nick)
    {
        this.session = session;
        this.realm = realm;
        this.wallet = wallet;
        this.nick = nick;

        clear();
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o)
        {
            return true;
        }

        if (!(o instanceof Client))
        {
            return false;
        }

        Client client = (Client) o;
        return Objects.equals(session, client.session);
    }

    @Override
    public int hashCode()
    {
        return session.hashCode();
    }

    public void incAutocomplete()
    {
        currAutocomplete++;
    }

    public void incAutocut()
    {
        currAutocut++;
    }

    public void clear()
    {
        currAutocomplete = 0;
        currAutocut = 0;
        autocompleteReady = false;
        autocutReady = false;
    }

    public Session getSession()
    {
        return session;
    }

    public String getRealm()
    {
        return realm;
    }

    public String getWallet()
    {
        return wallet;
    }

    public String getNick()
    {
        return nick;
    }

    public int getAutocomplete()
    {
        return currAutocomplete;
    }

    public int getAutocut()
    {
        return currAutocut;
    }
}
