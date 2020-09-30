package party_related;

import game.Client;

public class TimedPartyMessagesHandler extends PartyMessagesHandler
{
    TimedPartyMessagesHandler(Party party)
    {
        super(party);
    }

    @Override
    public String getJoinableMessage()
    {
        return "connected\n" +
                Party.AUTOCOMPLETE_PRICE + "\n" +
                Party.AUTOCUT_PRICE + "\n" +
                "Welcome to the special quiz!\n" +
                "Click the button to join!\n" +
                "-------------------------------->";
    }

    @Override
    public String getHostMessage()
    {
        return "bad_connected\n" +
                "Get ready!\n" +
                "The special quiz starts very soon!";
    }

    @Override
    public String getCountdownStartMessage(String topic)
    {
        return "countdown\n" +
                "The special quiz starts in ...\n" +
                "Players: " + party.playingPlayers.size() + "/" + party.maxPlayingSize + "\n" +
                "Topic: " + topic + "\n" +
                "Questions: " + party.questionnaire.getTotalNumber();
    }

    @Override
    public String getFinishMessage(Client player)
    {
        return "finish\n" +
                "Thanks for playing! See you in a week!\n" +
                "Your score: " + party.totalCorrect.get(player) + "/" + party.questionnaire.getTotalNumber();
    }

    public String getTimedClearMessage()
    {
        return "clear_timed";
    }

    public String getTimedQuizTimerResponse(int timeLeft, String topic)
    {
        String response = "scheduled_timer\n";

        if (timeLeft > 0)
        {
            response += "Special quiz starts in\n";

            int seconds = timeLeft % 60;
            timeLeft /= 60;
            int minutes = timeLeft % 60;
            timeLeft /= 60;
            int hours = timeLeft % 24;
            timeLeft /= 24;
            int days = timeLeft;

            int[] timeArray = new int[] {days, hours, minutes, seconds};
            String[] aliasArray = new String[] {"d", "h", "m", "s"};

            for (int i = 0; i < timeArray.length; i++)
            {
                if (timeArray[i] != 0)
                {
                    response += timeArray[i] + aliasArray[i];

                    if (i < timeArray.length - 1)
                    {
                        response += " ";
                    }
                }
            }

            response += "\nTopic: " + topic;
        }
        else
        {
            response += "The special quiz\n" +
                    "has started!";
        }

        return response;
    }
}
