<?php
session_start();

if (empty($_SESSION['loginSession'])) {
    header("Location: ../index.php");
    exit();
}

require 'util/main_handler.php';

unset($_SESSION['FROM_QUESTION_EDIT']);

if (isDBOutputEmpty()) {
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
    <div class="main_header">
        <div class="name">Quiz Admin Tool</div>

        <span class="diff_page">
            <a href="../timed/timed_main.php">Timed Quizzes</a>
        </span>
        <span class="diff_page current_page">
            <a href="random_main.php">Random Quizzes</a>
        </span>
    </div>

    <div class="content">
        <div class="card">
            <?php
            displaySuccess();
            displayError();
            displayConfirm();
            ?>
        </div>

        <div class="card">
            <div class="card_question">
                <span class="title">Add new quiz</span>
                <form autocomplete="off" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
                    <br>
                    <label for="add_category">New system name:</label>
                    <input class="green_text" type="text" name="add_category">
                    <div class="space"></div>
                    <input class="green_submit" type="submit" value="Add" name="add">
                </form>
            </div>
        </div>

        <div class="card">
            <div class="table">
                <p class="quiz">Random Quizzes</p>
                <?php
                display();
                ?>
            </div>
        </div>
    </div>

</body>

</html>