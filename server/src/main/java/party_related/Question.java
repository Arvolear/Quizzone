package party_related;

import java.util.ArrayList;

public class Question
{
    private final String question;
    private final ArrayList<String> variants;
    private final int answer;

    public Question(String question, ArrayList<String> variants, int answer)
    {
        this.question = question;
        this.variants = variants;
        this.answer = answer;
    }

    public String getCorrectVariant()
    {
        return variants.get(variants.size() - answer);
    }

    public String getQuestion()
    {
        return question;
    }

    public int getAnswer()
    {
        return answer;
    }

    public ArrayList<String> getVariants()
    {
        return variants;
    }

    @Override
    public String toString()
    {
        StringBuilder builder = new StringBuilder();

        builder.append("question\n");
        builder.append(question).append("\n");

        for (var variant: variants)
        {
            builder.append(variant).append("\n");
        }

        return builder.toString();
    }
}
