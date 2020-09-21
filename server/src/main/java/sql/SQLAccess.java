package sql;

import party_related.Question;
import party_related.RandomCategory;
import party_related.TimedCategory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.TreeMap;

public class SQLAccess
{
    private static SQLAccess access;

    private static final String LOGIN = "quizzer";
    private static final String PASSWORD = "quiz4All";

    private static final String DB = "quiz";

    private Connection connection;

    public static SQLAccess getInstance()
    {
        if (access == null)
        {
            access = new SQLAccess();
        }

        return access;
    }

    private SQLAccess()
    {
        try
        {
            Class.forName("com.mysql.cj.jdbc.Driver");

            connection = DriverManager.getConnection("jdbc:mysql://localhost/" + DB + "?" +
                    "useUnicode=true" +
                    "&serverTimezone=UTC" +
                    "&user=" + LOGIN +
                    "&password=" + PASSWORD);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }
    }

    public ArrayList<TimedCategory> getTimedCategories()
    {
        ArrayList<TimedCategory> categories = new ArrayList<>();

        try
        {
            Statement statement = connection.createStatement();
            ResultSet result = statement.executeQuery("SELECT * FROM " + DB + ".timed_categories");

            while (result.next())
            {
                categories.add(new TimedCategory(
                        result.getString("category"),
                        result.getString("alias"),
                        result.getString("date")));
            }
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }

        return categories;
    }

    public ArrayList<RandomCategory> getRandomCategories()
    {
        ArrayList<RandomCategory> categories = new ArrayList<>();

        try
        {
            Statement statement = connection.createStatement();
            ResultSet result = statement.executeQuery("SELECT * FROM " + DB + ".random_categories");

            while (result.next())
            {
                categories.add(new RandomCategory(
                        result.getString("category"),
                        result.getString("alias")));
            }
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }

        return categories;
    }

    public TreeMap<String, Integer> getRandomConstants()
    {
        TreeMap<String, Integer> constants = new TreeMap<>();

        try
        {
            Statement statement = connection.createStatement();
            ResultSet result = statement.executeQuery("SELECT * FROM " + DB + ".random_constants");

            if (result.next())
            {
                constants.put("max_playing_size", result.getInt("max_playing_size"));
                constants.put("start_game_threshold", result.getInt("start_game_threshold"));
                constants.put("start_timeout", result.getInt("start_timeout"));
                constants.put("question_duration", result.getInt("question_duration"));
                constants.put("answer_duration", result.getInt("answer_duration"));
                constants.put("end_timeout", result.getInt("end_timeout"));
            }
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }

        return constants;
    }

    public TreeMap<String, Integer> getTimedConstants()
    {
        TreeMap<String, Integer> constants = new TreeMap<>();

        try
        {
            Statement statement = connection.createStatement();
            ResultSet result = statement.executeQuery("SELECT * FROM " + DB + ".timed_constants");

            if (result.next())
            {
                constants.put("max_playing_size", result.getInt("max_playing_size"));
                constants.put("block_other_parties_timeout", result.getInt("block_other_parties_timeout"));
                constants.put("start_game_threshold", result.getInt("start_game_threshold"));
                constants.put("start_timeout", result.getInt("start_timeout"));
                constants.put("question_duration", result.getInt("question_duration"));
                constants.put("answer_duration", result.getInt("answer_duration"));
                constants.put("end_timeout", result.getInt("end_timeout"));
            }
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }

        return constants;
    }

    public void moveCategoryFromTimedToFinished(RandomCategory category)
    {
        try
        {
            Statement statement = connection.createStatement();

            statement.executeUpdate(
                    "DELETE FROM " + DB + ".timed_categories " +
                            "WHERE category = " + "\"" + category.getCategory() + "\"");
            statement.executeUpdate(
                    "INSERT INTO " + DB + ".timed_categories_finished " +
                            "VALUES (NULL, " +
                            "\"" + category.getCategory() + "\", " +
                            "\"" + category.getAlias() + "\")");
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }
    }

    public ArrayList<Question> getQuestions(String category)
    {
        ArrayList<Question> questions = new ArrayList<>();

        try
        {
            Statement statement = connection.createStatement();
            ResultSet result = statement.executeQuery("SELECT * FROM " + DB + "." + category);

            while (result.next())
            {
                ArrayList<String> variants = new ArrayList<>();

                String question = result.getString("question");

                variants.add("4) " + result.getString("variant4"));
                variants.add("3) " + result.getString("variant3"));
                variants.add("2) " + result.getString("variant2"));
                variants.add("1) " + result.getString("variant1"));

                int answer = result.getInt("answer");

                questions.add(new Question(
                        question,
                        variants,
                        answer
                ));
            }
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }

        return questions;
    }

    public void addToLifetimeBest(String nick, int score)
    {
        try
        {
            Statement statement = connection.createStatement();
            ResultSet result = statement.executeQuery(
                    "SELECT * FROM " + DB + ".lifetime_best " +
                            "WHERE nick = " + "\"" + nick + "\"");

            if (result.next())
            {
                int totalScore = result.getInt("score") + score;

                statement.executeUpdate(
                        "UPDATE " + DB + ".lifetime_best " +
                                "SET score = " + totalScore +
                                " WHERE nick = " + "\"" + nick + "\"");
            }
            else
            {
                statement.executeUpdate(
                        "INSERT INTO " + DB + ".lifetime_best " +
                                "VALUES (NULL, " + "\"" + nick + "\", " + score + ")");
            }
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }
    }

    public ArrayList<String> getAllLifetimeBest()
    {
        ArrayList<String> allLifetimeBest = new ArrayList<>();

        try
        {
            Statement statement = connection.createStatement();
            ResultSet result = statement.executeQuery("SELECT * FROM " + DB + ".lifetime_best ORDER BY score DESC");

            while (result.next())
            {
                String nick = result.getString("nick");
                int score = result.getInt("score");

                allLifetimeBest.add(nick + " ----- " + score);
            }
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }

        return allLifetimeBest;
    }

    public String getLifetimeBest(String nick)
    {
        String lifetimeBest = "";

        try
        {
            Statement statement = connection.createStatement();
            ResultSet result = statement.executeQuery(
                        "SELECT * FROM " + DB + ".lifetime_best " +
                                "WHERE nick = " + "\"" + nick + "\"");

            if (result.next())
            {
                int score = result.getInt("score");

                lifetimeBest = nick + " ----- " + score;
            }
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }

        return lifetimeBest;
    }
}
