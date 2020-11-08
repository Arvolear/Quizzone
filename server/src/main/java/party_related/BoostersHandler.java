package party_related;

import game.Client;

public class BoostersHandler
{
    private final AbstractParty party;

    public BoostersHandler(AbstractParty party)
    {
        this.party = party;
    }

    synchronized public void handleBoostersMessages()
    {
        for (var player : party.getPlayingPlayers().values())
        {
            sendDisplayBooster(player);

            if (player.getAutocompleteLeft() > 0)
            {
                party.send(player, party.getMessagesHandler().getShowMessage(player, "autocomplete"));
            }

            if (player.getAutocutLeft() > 0)
            {
                party.send(player, party.getMessagesHandler().getShowMessage(player, "autocut"));
            }
        }
    }

    synchronized public void handleUse(Client player, String[] lines, boolean nowQuestion)
    {
        if (lines[1].equals(player.getWallet()))
        {
            if (lines[0].equals("use_autocomplete"))
            {
                if (player.getAutocompleteLeft() > 0)
                {
                    player.decAutocomplete();
                    player.setAutocompleteReady(true);

                    party.send(player, party.getMessagesHandler().getHideMessage("autocomplete"));
                    party.send(player, party.getMessagesHandler().getHideMessage("autocut"));
                }
            }
            else
            {
                if (player.getAutocutLeft() > 0)
                {
                    player.decAutocut();
                    player.setAutocutReady(true);

                    party.send(player, party.getMessagesHandler().getHideMessage("autocomplete"));
                    party.send(player, party.getMessagesHandler().getHideMessage("autocut"));
                }
            }

            if (nowQuestion)
            {
                sendDisplayBooster(player);
            }
        }
    }

    synchronized public void handleBuy(Client player, String[] lines, boolean nowQuestion)
    {
        if (lines[3].equals(player.getWallet()))
        {
            int autocompleteNum = 0;
            int autocutNum = 0;

            try
            {
                autocompleteNum = Integer.parseInt(lines[1]);
                autocutNum = Integer.parseInt(lines[2]);

                if (autocompleteNum + autocutNum > 3)
                {
                    return;
                }
            }
            catch (Exception ex)
            {
                ex.printStackTrace();
            }

            player.setAutocompleteLeft(autocompleteNum);
            player.setAutocutLeft(autocutNum);

            if (nowQuestion)
            {
                handleBoostersMessages();
            }
        }
    }

    synchronized private void sendDisplayBooster(Client player)
    {
        if (player.isAutocompleteReady())
        {
            party.send(player, party.getMessagesHandler().getDisplayMessage("autocomplete"));
            player.setAutocompleteReady(false);
        }
        else if (player.isAutocutReady())
        {
            party.send(player, party.getMessagesHandler().getDisplayMessage("autocut"));
            player.setAutocutReady(false);
        }
    }
}
