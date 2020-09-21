package party_related;

import org.eclipse.jetty.websocket.api.Session;

import java.util.ArrayList;
import java.util.Map;

public class PartyMessagesHandler
{
    protected Party party;

    public PartyMessagesHandler(Party party)
    {
        this.party = party;
    }

    public String getLockedMessage()
    {
        return "connected\n" +
                "The session has already started\n" +
                "Please wait for the next quiz";
    }

    public String getJoinableMessage()
    {
        return "connected\n" +
                "Click the button to join the quiz!\n" +
                "-------------------------------->";
    }

    public String getHostMessage()
    {
        return "connected\n" +
                "Click the button to start the quiz!\n" +
                "-------------------------------->";
    }

    public String getCountdownStartMessage(String topic)
    {
        return "countdown\n" +
                "The quiz starts in ...\n" +
                "Players: " + party.playingPlayers.size() + "/" + party.maxPlayingSize + "\n" +
                "Topic: " + topic + "\n" +
                "Questions: " + party.questionnaire.getTotalNumber();
    }

    public String getCountdownWaitMessage(String topic)
    {
        return "countdown\n" +
                "Waiting for the players ...\n" +
                party.playingPlayers.size() + "/" + party.startGameThreshold + "\n" +
                "Topic: " + topic + "\n" +
                "Questions: " + party.questionnaire.getTotalNumber();
    }

    public String getTimerUpdateMessage(int timeLeft)
    {
        return "timer\n" +
                timeLeft;
    }

    public String getStartMessage()
    {
        Question question = party.questionnaire.getCurrentQuestion();

        return "start\n" +
                party.questionnaire.getTotalNumber() + "\n" +
                question.toString();
    }

    public String getGetMessage()
    {
        return "get";
    }

    public String getNextMessage()
    {
        Question question = party.questionnaire.getCurrentQuestion();

        return "next\n" +
                party.questionnaire.getCurrentQuestionNumber() + "\n" +
                question.toString();
    }

    public String getCorrectAnswerMessage()
    {
        return "answer\n" +
                "That's correct!";
    }

    public String getWrongAnswerMessage()
    {
        return "answer\n" +
                "Sorry, that's wrong!";
    }

    public String getFinishMessage(Session player)
    {
        return "finish\n" +
                "Thanks for playing!\n" +
                "Your score - " + party.totalCorrect.get(player) + "/" + party.questionnaire.getTotalNumber();
    }

    public String getClearMessage()
    {
        return "clear";
    }

    public String getTopPartyResponse()
    {
        StringBuilder builder = new StringBuilder();

        builder.append("top_party\n").
                append("Party best\n");

        ArrayList<Map.Entry<Session, Integer>> topParty = new ArrayList<>(party.totalCorrect.entrySet());

        topParty.sort((left, right) ->
        {
            int res = right.getValue() - left.getValue();

            return res == 0 ?
                    party.playingPlayers.get(left.getKey()).compareTo(party.playingPlayers.get(right.getKey())) :
                    res;
        });

        int place = 1;

        for (var pair : topParty)
        {
            if (place >= Party.PARTY_TOP_LIMIT)
            {
                break;
            }

            builder.append(place).append(") ").
                    append(party.playingPlayers.get(pair.getKey())).
                    append(" ----- ").append(pair.getValue()).
                    append("/").
                    append(party.questionnaire.getTotalNumber()).
                    append("\n");

            place++;
        }

        return builder.toString();
    }

    public String getLifetimeBestResponse(Session player)
    {
        return getLifetimeBestResponse(party.sqlAccess.getAllLifetimeBest(), player);
    }

    public String getLifetimeBestResponse(ArrayList<String> allLifetimeBest, Session player)
    {
        StringBuilder builder = new StringBuilder();
        String lifetimeBest = party.sqlAccess.getLifetimeBest(party.idlePlayers.get(player));

        builder.append("lifetime_best\n").
                append("Lifetime best\n");

        for (int i = 0; i < allLifetimeBest.size() && i < Party.LIFETIME_BEST_LIMIT; i++)
        {
            builder.append(i + 1).append(") ").append(allLifetimeBest.get(i)).append("\n");
        }

        builder.append("------------------------------------\n");

        int place = allLifetimeBest.indexOf(lifetimeBest);

        if (place > -1)
        {
            builder.append(place + 1).append(") ").append(lifetimeBest);
        }
        else
        {
            builder.append("Complete a quiz to see your place!");
        }

        return builder.toString();
    }
}
