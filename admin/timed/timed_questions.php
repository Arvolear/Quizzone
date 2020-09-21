<?php
session_start();

if (empty($_SESSION['loginSession'])) {
    header("Location: ../index.php");
    exit();
}

require 'util/questions_handler.php';

if (isDisplayEmpty()) {
    getAll();
}
?>

<!DOCTYPE HTML>
<html>

<head>
    <meta name="theme-color" content="#111111">
    <meta name="viewport" content="width=device-width, initial-scale=0.1">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
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
            displaySuccess();
            displayError();
            displayConfirm();
            ?>
        </div>

        <div class="card">
            <div class="card_question">
                <span class="title">Import questions (CSV)</span>
                <form autocomplete="off" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post" enctype="multipart/form-data">
                    <br>
                    <div class="publish_columns">
                        <div class="column_left">
                            <label for="import_questions" class="blue_file">Choose a file</label>
                            <input type="file" id="import_questions" name="import_questions">
                        </div>
                        <div class="column_right publish_columns">
                            <div class="column_left_more">
                                <input class="green_submit" type="submit" value="Import" name="import">
                            </div>
                            <div class="column_right_center">
                                <label for="shuffle" id="shuffle_label" class="green_check">Shuffle on import</label>
                                <input type="checkbox" id="shuffle" name="shuffle" value="shuffle">
                            </div>
                        </div>
                    </div>
                </form>
                <script type="text/javascript">
                    $('#import_questions').change(function() {
                        var file = $('#import_questions')[0].files[0].name;
                        $(this).prev('label').text("Selected: " + file);
                    });

                    $("#shuffle_label").click(function() {
                        if ($("#shuffle_label").hasClass('green_check_clicked')) {
                            $("#shuffle_label").removeClass('green_check_clicked').addClass('green_check');
                        } else {
                            $("#shuffle_label").addClass('green_check_clicked').removeClass('green_check');
                        }
                    });
                </script>
            </div>
        </div>

        <?php
        displayImportedQuestions();
        ?>

        <div class="card">
            <div class="card_question">
                <span class="title">Add Question</span>
                <form autocomplete="off" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
                    <br>
                    <label for="add_question">Question:</label>
                    <input class="green_text" type="text" name="add_question">

                    <div class="add_columns">
                        <div class="column_left">
                            <label for="add_variant1">Variant 1:</label>
                            <input class="green_text" type="text" name="add_variant1">

                            <label for="add_variant3">Variant 3:</label>
                            <input class="green_text" type="text" name="add_variant3">
                        </div>

                        <div class="column_right">
                            <label for="add_variant2">Variant 2:</label>
                            <input class="green_text" type="text" name="add_variant2">

                            <label for="add_variant4">Variant 4:</label>
                            <input class="green_text" type="text" name="add_variant4">
                        </div>
                    </div>

                    <span class="normal">Answer:</span>
                    <div class="grid">
                        <label class="radio_label">1
                            <input class="green_radio" type="radio" name="add_answer" value="1" checked>
                        </label>

                        <label class="radio_label">2
                            <input class="green_radio" type="radio" name="add_answer" value="2">
                        </label>

                        <label class="radio_label">3
                            <input class="green_radio" type="radio" name="add_answer" value="3">
                        </label>

                        <label class="radio_label">4
                            <input class="green_radio" type="radio" name="add_answer" value="4">
                        </label>
                    </div>
                    <div class="space"></div>

                    <input type="hidden" value="-1" name="add_index">
                    <input class="green_submit" type="submit" value="Add" name="add">
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