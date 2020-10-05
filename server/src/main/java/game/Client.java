package game;


import org.eclipse.jetty.websocket.api.Session;

import java.util.Objects;

public class Client
{
    private Session session;
    private String realm;
    private String wallet;
    private String nick;

    private int autocompleteLeft;
    private int autocutLeft;

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

    public void setAutocompleteLeft(int left)
    {
        this.autocompleteLeft = left;
    }

    public void setAutocutLeft(int left)
    {
        this.autocutLeft = left;
    }

    public void decAutocomplete()
    {
        if (autocompleteLeft > 0)
        {
            autocompleteLeft--;
        }
    }

    public void decAutocut()
    {
        if (autocutLeft > 0)
        {
            autocutLeft--;
        }
    }

    public void clear()
    {
        autocompleteLeft = 0;
        autocutLeft = 0;
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

    public int getAutocompleteLeft()
    {
        return autocompleteLeft;
    }

    public int getAutocutLeft()
    {
        return autocutLeft;
    }
}
