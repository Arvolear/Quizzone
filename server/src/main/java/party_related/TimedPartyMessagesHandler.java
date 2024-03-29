package party_related;

public class TimedPartyMessagesHandler extends PartyMessagesHandler
{
    TimedPartyMessagesHandler(AbstractParty party)
    {
        super(party);
    }

    @Override
    public String getJoinableMessage(String topic)
    {
        return "join_connected\n" +
                RandomParty.AUTOCOMPLETE_PRICE + "\n" +
                RandomParty.AUTOCUT_PRICE + "\n" +
                "Welcome to the special quiz registration!\n" +
                "Today special quiz topic - " + topic + "\n" +
                "Please click the check in button to join!\n" +
                "<--------------------------------------------->";
    }

    public String getAwaitMessage()
    {
        return "awaiting_connected\n" +
                "Get ready and call your friends!\n" +
                "The special quiz registration opens very soon!";
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
    public String getFinishMessage()
    {
        return "finish\n";
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
            response += "Special quiz registration in\n";

            int seconds = timeLeft % 60;
            timeLeft /= 60;
            int minutes = timeLeft % 60;
            timeLeft /= 60;
            int hours = timeLeft % 24;
            timeLeft /= 24;
            int days = timeLeft;

            int[] timeArray = new int[]{days, hours, minutes, seconds};
            String[] aliasArray = new String[]{"d", "h", "m", "s"};

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
        else if (party.isStarted())
        {
            response += "The special quiz\n" +
                    "has started!";
        }
        else
        {
            response += "The special quiz\n" +
                    "registration is in progress";
        }

        return response;
    }
}
