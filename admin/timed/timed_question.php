<?php
session_start();

if (empty($_SESSION['loginSession'])) {
    header("Location: ../index.php");
    exit();
}

require 'util/question_handler.php';

$_SESSION['FROM_QUESTION_EDIT'] = true;

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
            <a href="timed_questions.php">Back</a>
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
                <span class="title">Edit Question</span>
                <form autocomplete="off" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
                    <br>
                    <label for="edit_question">New question:</label>
                    <input class="blue_text" type="text" name="edit_question" value="<?php displayQuestion() ?>">

                    <div class="add_columns">
                        <div class="column_left">
                            <label for="edit_variant1">Variant 1:</label>
                            <input class="blue_text" type="text" name="edit_variant1" value="<?php displayVariant1() ?>">

                            <label for="edit_variant3">Variant 3:</label>
                            <input class="blue_text" type="text" name="edit_variant3" value="<?php displayVariant3() ?>">
                        </div>

                        <div class="column_right">
                            <label for="edit_variant2">Variant 2:</label>
                            <input class="blue_text" type="text" name="edit_variant2" value="<?php displayVariant2() ?>">

                            <label for="edit_variant4">Variant 4:</label>
                            <input class="blue_text" type="text" name="edit_variant4" value="<?php displayVariant4() ?>">
                        </div>
                    </div>

                    <span class="normal">Answer:</span>
                    <div class="grid">
                        <label class="radio_label">1
                            <input class="blue_radio" type="radio" name="edit_answer" value="1" <?php displayAnswer("1") ?>>
                        </label>

                        <label class="radio_label">2
                            <input class="blue_radio" type="radio" name="edit_answer" value="2" <?php displayAnswer("2") ?>>
                        </label>

                        <label class="radio_label">3
                            <input class="blue_radio" type="radio" name="edit_answer" value="3" <?php displayAnswer("3") ?>>
                        </label>

                        <label class="radio_label">4
                            <input class="blue_radio" type="radio" name="edit_answer" value="4" <?php displayAnswer("4") ?>>
                        </label>
                    </div>
                    <div class="space"></div>
                    <input class="blue_submit" type="submit" value="Edit" name="edit">
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