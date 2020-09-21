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
            <?php
            displayConfirm();
            ?>
        </div>

        <div class="card">
            <div class="card_question">
                <span class="title">Unpublish from production</span>
                <form autocomplete="off" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
                    <br>
                    <input class="red_submit" type="submit" value="Unpublish" name="unpublish">
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