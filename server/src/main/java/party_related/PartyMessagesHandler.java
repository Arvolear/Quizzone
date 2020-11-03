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
        return "bad_connected";
    }

    public String getFullMessage()
    {
        return "full_connected\n" +
                "The quiz is full, please wait for it to end!";
    }

    public String getJoinableMessage(String topic)
    {
        return "join_connected\n" +
                Party.AUTOCOMPLETE_PRICE + "\n" +
                Party.AUTOCUT_PRICE + "\n" +
                "You can join a random quiz now!\n" +
                "Randomly chosen topic - " + topic + "\n" +
                "Please click the check in button to join\n" +
                "<--------------------------------------------->";
    }

    public String getHostMessage()
    {
        return "host_connected\n" +
                Party.AUTOCOMPLETE_PRICE + "\n" +
                Party.AUTOCUT_PRICE + "\n" +
                "Special quiz registration is not open yet...\n" +
                "However, you may call your friends to play a random quiz!\n" +
                "You all will have to click the check in button\n" +
                "<--------------------------------------------->";
    }

    public String getCountdownStartMessage(String topic)
    {
        return "countdown\n" +
                "The random quiz starts in ...\n" +
                "Players: " + party.playingPlayers.size() + "/" + party.maxPlayingSize + "\n" +
                "Topic: " + topic + "\n" +
                "Questions: " + party.getQuestionnaire().getTotalNumber();
    }

    public String getCountdownWaitMessage(String topic)
    {
        return "countdown\n" +
                "Waiting for the players ...\n" +
                party.playingPlayers.size() + "/" + party.startGameThreshold + "\n" +
                "Topic: " + topic + "\n" +
                "Questions: " + party.getQuestionnaire().getTotalNumber();
    }

    public String getTimerUpdateMessage(int timeLeft)
    {
        return "timer\n" +
                timeLeft;
    }

    public String getShowMessage(Client player, String type)
    {
        switch (type)
        {
            case "autocomplete":
            {
                return type + "\n" +
                        "show\n" +
                        player.getAutocompleteLeft();
            }
            case "autocut":
            {
                return type + "\n" +
                        "show\n" +
                        player.getAutocutLeft();
            }
            case "control_buttons":
            {
                return type + "\n" +
                        "show";
            }
        }

        return "";
    }

    public String getDisplayMessage(String type)
    {
        if (type.equals("autocomplete"))
        {
            return type + "\n" + "display" + "\n" + party.getQuestionnaire().getCurrentQuestion().getAnswer();
        }
        else if (type.equals("autocut"))
        {
            Question question = party.getQuestionnaire().getCurrentQuestion();
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
        if (type.equals("autocomplete") || type.equals("autocut") || type.equals("control_buttons"))
        {
            return type + "\n" + "hide";
        }

        return "";
    }

    public String getStartPlayingMessage()
    {
        Question question = party.getQuestionnaire().getCurrentQuestion();

        return "start_playing\n" +
                party.getQuestionnaire().getCurrentQuestionNumber() + "\n" +
                party.getQuestionnaire().getTotalNumber() + "\n" +
                question.toString();
    }

    public String getStartIdleMessage()
    {
        Question question = party.getQuestionnaire().getCurrentQuestion();

        return "start_idle\n" +
                party.getQuestionnaire().getCurrentQuestionNumber() + "\n" +
                party.getQuestionnaire().getTotalNumber() + "\n" +
                question.toString();
    }

    public String getGetMessage()
    {
        return "get";
    }

    public String getNextMessage()
    {
        Question question = party.getQuestionnaire().getCurrentQuestion();

        return "next\n" +
                party.getQuestionnaire().getCurrentQuestionNumber() + "\n" +
                party.getQuestionnaire().getTotalNumber() + "\n" +
                question.toString();
    }

    public String getCorrectAnswerMessage()
    {
        return "answer\n" +
                "true\n" +
                "That's correct!";
    }

    public String getWrongAnswerMessage()
    {
        Question question = party.getQuestionnaire().getCurrentQuestion();

        return "answer\n" +
                "false\n" +
                "Sorry, that's wrong!\n" +
                "Correct answer was:\n" +
                question.getCorrectVariant();
    }

    public String getAnswerStatisticsMessage(ArrayList<Integer> answers)
    {
        Question question = party.getQuestionnaire().getCurrentQuestion();

        return "answer_statistics\n" +
                "Players' answers:\n" +
                "4) " + answers.get(3) + "\n" +
                "3) " + answers.get(2) + "\n" +
                "2) " + answers.get(1) + "\n" +
                "1) " + answers.get(0) + "\n" +
                "Correct answer:\n" +
                question.getCorrectVariant();
    }

    public String getAnswerStatisticsSoundMessage()
    {
        return "answer_statistics_sound";
    }

    public String getFinishMessage()
    {
        return "finish";
    }

    public String getClearMessage()
    {
        return "clear";
    }

    public String getApplauds(Client player, boolean isObserver)
    {
        if (isObserver)
        {
            return "applauds";
        }
        else
        {
            ArrayList<Map.Entry<Client, Integer>> topParty = new ArrayList<>(party.totalCorrect.entrySet());

            topParty.sort((left, right) ->
            {
                int res = right.getValue() - left.getValue();

                return res == 0 ?
                        party.playingPlayers.get(left.getKey()).getNick().compareTo(party.playingPlayers.get(right.getKey()).getNick()) :
                        res;
            });

            int place = 1;
            boolean ok = false;

            for (var pair : topParty)
            {
                if (place > Party.PARTY_TOP_LIMIT)
                {
                    break;
                }

                if (player.equals(pair.getKey()))
                {
                    ok = true;
                    break;
                }

                place++;
            }

            if (ok)
            {
                return "applauds";
            }
        }

        return "";
    }

    public String getTopPartyResponse(Client player, boolean isObserver)
    {
        StringBuilder builder = new StringBuilder();

        builder.append("top_party\n");

        if (isObserver)
        {
            builder.append("Thanks for watching!\n");
        }
        else
        {
            builder.append("Thanks for playing! Now you can leave the field!\n");
        }

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
            if (place > Party.PARTY_TOP_LIMIT)
            {
                break;
            }

            builder.append(place).append(") ").
                    append(pair.getKey().getNick()).
                    append(" ----- ").append(pair.getValue()).
                    append("/").
                    append(party.getQuestionnaire().getTotalNumber()).
                    append("\n");

            place++;
        }

        place = 1;
        boolean ok = false;

        for (var pair : topParty)
        {
            if (player.equals(pair.getKey()))
            {
                builder.append("------------------------------------\n").
                        append(place).append(") ").
                        append(pair.getKey().getNick()).
                        append(" ----- ").append(pair.getValue()).
                        append("/").
                        append(party.getQuestionnaire().getTotalNumber());

                ok = true;
                break;
            }

            place++;
        }

        if (!ok)
        {
            builder.append("------------------------------------\n").
                    append("You were an observer");
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
