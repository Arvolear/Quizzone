package party_related;

import game.Client;

import java.util.ArrayList;
import java.util.Map;
import java.util.Random;

public class PartyMessagesHandler
{
    protected Party party;

    public PartyMessagesHandler(Party party)
    {
        this.party = party;
    }

    public String getLockedMessage()
    {
        return "bad_connected\n" +
                "The session has already started\n" +
                "Please wait for the next quiz";
    }

    public String getJoinableMessage()
    {
        return "connected\n" +
                Party.AUTOCOMPLETE_PRICE + "\n" +
                Party.AUTOCUT_PRICE + "\n" +
                "Click the button to join the quiz!\n" +
                "-------------------------------->";
    }

    public String getHostMessage()
    {
        return "connected\n" +
                Party.AUTOCOMPLETE_PRICE + "\n" +
                Party.AUTOCUT_PRICE + "\n" +
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

    public String getShowMessage(Client player, String type)
    {
        if (type.equals("autocomplete"))
        {
            return type + "\n" +
                    "show\n" +
                    player.getAutocompleteLeft();
        }
        else if (type.equals("autocut"))
        {
            return type + "\n" +
                    "show\n" +
                    player.getAutocutLeft();
        }

        return "";
    }

    public String getDisplayMessage(String type)
    {
        if (type.equals("autocomplete"))
        {
            return type + "\n" + "display" + "\n" + party.questionnaire.getCurrentQuestion().getAnswer();
        }
        else if (type.equals("autocut"))
        {
            Question question = party.questionnaire.getCurrentQuestion();
            ArrayList<String> variants = new ArrayList<>(question.getVariants());
            int answer = question.getAnswer() - 1;

            Random random = new Random();

            int ok = 0;
            while (ok < 2)
            {
                int randIndex = random.nextInt(variants.size());

                if (randIndex != variants.size() - answer - 1 && !variants.get(randIndex).equals(""))
                {
                    variants.set(randIndex, "");
                    ok++;
                }
            }

            StringBuilder builder = new StringBuilder();

            builder.append("question\n");
            builder.append(question.getQuestion()).append("\n");

            for (int i = 0; i < variants.size(); i++)
            {
                if (variants.get(i).equals(""))
                {
                    builder.append(variants.size() - i).append(") ---").append("\n");
                }
                else
                {
                    builder.append(variants.get(i)).append("\n");
                }
            }

            return type + "\n" + "display" + "\n" + builder.toString();
        }

        return "";
    }

    public String getHideMessage(String type)
    {
        if (type.equals("autocomplete") || type.equals("autocut"))
        {
            return type + "\n" + "hide";
        }

        return "";
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

    public String getAnswerStatisticsMessage(ArrayList<Integer> answers)
    {
        return "answer_statistics\n" +
                "Players' answers\n" +
                "4) " + answers.get(0) + "\n" +
                "3) " + answers.get(1) + "\n" +
                "2) " + answers.get(2) + "\n" +
                "1) " + answers.get(3);
    }

    public String getWrongAnswerMessage()
    {
        return "answer\n" +
                "Sorry, that's wrong!";
    }

    public String getFinishMessage(Client player)
    {
        return "finish\n";
    }

    public String getClearMessage()
    {
        return "clear";
    }

    public String getTopPartyResponse()
    {
        StringBuilder builder = new StringBuilder();

        builder.append("top_party\n").
                append("Thanks for playing!\n").
                append("Party best\n");

        ArrayList<Map.Entry<Client, Integer>> topParty = new ArrayList<>(party.totalCorrect.entrySet());

        topParty.sort((left, right) ->
        {
            int res = right.getValue() - left.getValue();

            return res == 0 ?
                    party.playingPlayers.get(left.getKey()).getNick().compareTo(party.playingPlayers.get(right.getKey()).getNick()) :
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
                    append(pair.getKey().getNick()).
                    append(" ----- ").append(pair.getValue()).
                    append("/").
                    append(party.questionnaire.getTotalNumber()).
                    append("\n");

            place++;
        }

        return builder.toString();
    }

    public String getLifetimeBestResponse(Client player)
    {
        return getLifetimeBestResponse(party.sqlAccess.getAllLifetimeBest(), player);
    }

    public String getLifetimeBestResponse(ArrayList<String> allLifetimeBest, Client player)
    {
        StringBuilder builder = new StringBuilder();
        String lifetimeBest = party.sqlAccess.getLifetimeBest(player.getNick());

        builder.append("lifetime_best\n");

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
