package game;

import org.eclipse.jetty.websocket.api.Session;

public class Client
{
    private final Session session;
    private final String realm;
    private final String wallet;
    private final String nick;

    private int autocompleteLeft;
    private int autocutLeft;

    private boolean autocompleteReady;
    private boolean autocutReady;

    public Client(Session session, String realm, String wallet, String nick)
    {
        this.session = session;
        this.realm = realm;
        this.wallet = wallet;
        this.nick = nick;

        clearBoosters();
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
        return nick.equals(client.nick);
    }

    @Override
    public int hashCode()
    {
        return nick.hashCode();
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

    public void clearReadyBoosters()
    {
        autocompleteReady = false;
        autocutReady = false;
    }

    public void clearBoosters()
    {
        autocompleteLeft = 0;
        autocutLeft = 0;

        clearReadyBoosters();
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

    public boolean isAutocompleteReady()
    {
        return autocompleteReady;
    }

    public boolean isAutocutReady()
    {
        return autocutReady;
    }

    public void setAutocompleteReady(boolean autocompleteReady)
    {
        this.autocompleteReady = autocompleteReady;
    }

    public void setAutocutReady(boolean autocutReady)
    {
        this.autocutReady = autocutReady;
    }
}
