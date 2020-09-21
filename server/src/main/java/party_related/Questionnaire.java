package party_related;

import sql.SQLAccess;

import java.util.ArrayList;

public class Questionnaire
{
    private final SQLAccess sqlAccess;

    private String category = "";
    private int totalNumber;

    private ArrayList<Question> questions;

    private int currentQuestion;

    public Questionnaire()
    {
        sqlAccess = SQLAccess.getInstance();
    }

    public void loadQuestions(String category)
    {
        this.category = category;

        questions = sqlAccess.getQuestions(category);
        totalNumber = questions.size();
        currentQuestion = 0;
    }

    public void finish()
    {
        currentQuestion = totalNumber + 1;
    }

    public boolean isFinished()
    {
        return currentQuestion >= totalNumber;
    }

    public boolean isCorrect(int answer)
    {
        Question cur = getCurrentQuestion();

        return cur != null && cur.getAnswer() == answer;
    }

    public void toNextQuestion()
    {
        currentQuestion++;
    }

    public Question getCurrentQuestion()
    {
        if (currentQuestion >= totalNumber)
        {
            return null;
        }

        return questions.get(currentQuestion);
    }

    public int getCurrentQuestionNumber()
    {
        return currentQuestion;
    }

    public String getCategory()
    {
        return category;
    }

    public int getTotalNumber()
    {
        return totalNumber;
    }
}
