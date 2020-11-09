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
    <script src="js/utc_time.js"></script>

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
                <span class="title">Republish to production</span>
                <form autocomplete="off" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
                    <br>
                    <label for="republish_alias">Ingame name:</label>
                    <input class="blue_text" type="text" name="republish_alias">

                    <div class="time">
                        <div class="subtitle time_left">Quiz UTC start time (all numbers):</div>
                        <div class="subtitle time_right" id="utc_time">UTC time:</div>
                    </div>
                    <div class="publish_columns">
                        <div class="column_left">
                            <label for="republish_year">Year:</label>
                            <input class="blue_text" type="text" name="republish_year">
                        </div>
                        <div class="column_left">
                            <label for="republish_month">Month:</label>
                            <input class="blue_text" type="text" name="republish_month">
                        </div>
                        <div class="column_left">
                            <label for="republish_day">Day:</label>
                            <input class="blue_text" type="text" name="republish_day">
                        </div>
                        <div class="column_left">
                            <label for="republish_hour">Hour:</label>
                            <input class="blue_text" type="text" name="republish_hour" value="00">
                        </div>
                        <div class="column_left">
                            <label for="republish_minute">Minute:</label>
                            <input class="blue_text" type="text" name="republish_minute" value="00">
                        </div>
                        <div class="column_right">
                            <label for="republish_second">Second:</label>
                            <input class="blue_text" type="text" name="republish_second" value="00">
                        </div>
                    </div>
                    <div class="space"></div>
                    <input class="blue_submit" type="submit" value="Republish" name="republish">
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

    <script>
        displayTime();
        setInterval(displayTime, 1000);
    </script>
</body>

</html>