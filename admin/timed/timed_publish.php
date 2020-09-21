<?php
session_start();

if (empty($_SESSION['loginSession'])) {
    header("Location: ../index.php");
    exit();
}

require 'util/publish_handler.php';

if (isDisplayEmpty()) {
    getAll();
}
?>

<!DOCTYPE HTML>
<html>

<head>
    <meta name="theme-color" content="#111111">
    <meta name="viewport" content="width=device-width, initial-scale=0.1">

    <link href='https://fonts.googleapis.com/css?family=Aldrich' rel='stylesheet'>
    <link rel="stylesheet" href="../../global_styles/styles.css">
    <link rel="stylesheet" href="styles/styles.css">

    <title>Quiz timed</title>
    <link rel="icon" href="../../images/1.png">
</head>

<body>
    <div class="other_header">
        <span class="back_page">
            <a href="timed_main.php">Back</a>
        </span>
        <span class="sub_header">
            <span class="diff_page current_page">
                <a href="timed_main.php">Timed Quizzes</a>
            </span>
            <span class="diff_page">
                <a href="../random/random_main.php">Random Quizzes</a>
            </span>
        </span>
    </div>

    <div class="content">
        <div class="card">
            <?php displayError() ?>
        </div>

        <div class="card">
            <div class="card_question">
                <span class="title">Publish to production</span>
                <form autocomplete="off" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
                    <br>
                    <label for="publish_alias">Ingame name:</label>
                    <input class="green_text" type="text" name="publish_alias">

                    <p class="subtitle">Quiz UTC start time (all numbers):</p>
                    <div class="publish_columns">
                        <div class="column_left">
                            <label for="publish_year">Year:</label>
                            <input class="green_text" type="text" name="publish_year">
                        </div>
                        <div class="column_left">
                            <label for="publish_month">Month:</label>
                            <input class="green_text" type="text" name="publish_month">
                        </div>
                        <div class="column_left">
                            <label for="publish_day">Day:</label>
                            <input class="green_text" type="text" name="publish_day">
                        </div>
                        <div class="column_left">
                            <label for="publish_hour">Hour:</label>
                            <input class="green_text" type="text" name="publish_hour" value="00">
                        </div>
                        <div class="column_left">
                            <label for="publish_minute">Minute:</label>
                            <input class="green_text" type="text" name="publish_minute" value="00">
                        </div>
                        <div class="column_right">
                            <label for="publish_second">Second:</label>
                            <input class="green_text" type="text" name="publish_second" value="00">
                        </div>
                    </div>
                    <div class="space"></div>
                    <input class="green_submit" type="submit" value="Publish" name="publish">
                </form>
            </div>
        </div>

        <div class="card">
            <div class="table">
                <p class="quiz">Timed Quiz</p>
                <?php
                display();
                ?>
            </div>
        </div>
    </div>

</body>

</html>