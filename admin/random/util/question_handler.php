<?php
require __DIR__ . '/../../global_util/db_connect.php';
require __DIR__ . '/../../global_util/errors.php';

require 'checker.php';
require 'constants.php';

function getQuestion($category, $id)
{
    global $EDIT_CATEGORIES;

    global $DB;
    global $conn;
    global $DB_OUTPUT;

    $sqlEdit = "SELECT * FROM $DB.$EDIT_CATEGORIES WHERE category='$category'";

    $resultEdit = mysqli_query($conn, $sqlEdit);

    $sql = "SELECT * FROM $DB.$category WHERE id=$id";
    $result = mysqli_query($conn, $sql);

    $DB_OUTPUT .= "<p style=\"font-size:24px;text-align:center;\">$category";

    if (mysqli_num_rows($resultEdit) > 0) {
        $DB_OUTPUT .= " (edit):</p>";
    } else {
        $DB_OUTPUT .= " (finished):</p>";
    }

    $DB_OUTPUT .= "<table>";
    $DB_OUTPUT .= "<tr>";
    $DB_OUTPUT .= "<th class=\"tableId\">Id</th>";
    $DB_OUTPUT .= "<th>Question</th>";
    $DB_OUTPUT .= "<th>Variant1</th>";
    $DB_OUTPUT .= "<th>Variant2</th>";
    $DB_OUTPUT .= "<th>Variant3</th>";
    $DB_OUTPUT .= "<th>Variant4</th>";
    $DB_OUTPUT .= "<th>Answer</th>";

    $DB_OUTPUT .= "</tr>";

    $row = mysqli_fetch_array($result);

    $DB_OUTPUT .= "<tr>";
    $DB_OUTPUT .= "<td class=\"tableId\">" . $row['id'] . "</td>";
    $DB_OUTPUT .= "<td>" . $row['question'] . "</td>";
    $DB_OUTPUT .= "<td>" . $row['variant1'] . "</td>";
    $DB_OUTPUT .= "<td>" . $row['variant2'] . "</td>";
    $DB_OUTPUT .= "<td>" . $row['variant3'] . "</td>";
    $DB_OUTPUT .= "<td>" . $row['variant4'] . "</td>";
    $DB_OUTPUT .= "<td>" . $row['answer'] . "</td>";

    $DB_OUTPUT .= "</tr>";

    $DB_OUTPUT .= "</table>";
}

function getAll()
{
    getQuestion($_SESSION['edit_category'], $_SESSION['edit_id']);
}

function editQuestion($category, $id, $question, $variant1, $variant2, $variant3, $variant4, $answer)
{
    global $DB;
    global $conn;

    $question = addslashes(trim($question));
    $variant1 = addslashes(trim($variant1));
    $variant2 = addslashes(trim($variant2));
    $variant3 = addslashes(trim($variant3));
    $variant4 = addslashes(trim($variant4));

    $sqlEdit = "UPDATE $DB.$category SET 
                question='$question', 
                variant1='$variant1',  
                variant2='$variant2',  
                variant3='$variant3',  
                variant4='$variant4', 
                answer=$answer
                WHERE id=$id";

    mysqli_query($conn, $sqlEdit);

    $_SESSION['SUCCESS'] = "<p style=\"font-size:30px; text-align:center;\">Question successfully edited</p>";

    header("Location: random_questions.php", true, 303);
    exit();
}

if (
    isset($_SESSION['DB_OUTPUT']) ||
    isset($_SESSION['ERROR'])
) {
    $DB_OUTPUT = $_SESSION['DB_OUTPUT'];
    $ERROR = $_SESSION['ERROR'];

    unset($_SESSION['DB_OUTPUT']);
    unset($_SESSION['ERROR']);
} elseif ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (isset($_POST['edit'])) {
        if (
            !isset($_POST['edit_question']) ||
            !isset($_POST['edit_variant1']) ||
            !isset($_POST['edit_variant2']) ||
            !isset($_POST['edit_variant3']) ||
            !isset($_POST['edit_variant4']) ||
            $_POST['edit_question'] === "" ||
            $_POST['edit_variant1'] === "" ||
            $_POST['edit_variant2'] === "" ||
            $_POST['edit_variant3'] === "" ||
            $_POST['edit_variant4'] === ""
        ) {
            getEmptyError();
        } else {
            editQuestion(
                $_SESSION['edit_category'],
                $_SESSION['edit_id'],
                $_POST['edit_question'],
                $_POST['edit_variant1'],
                $_POST['edit_variant2'],
                $_POST['edit_variant3'],
                $_POST['edit_variant4'],
                $_POST['edit_answer']
            );
        }
    }

    $_SESSION['DB_OUTPUT'] = $DB_OUTPUT;
    $_SESSION['ERROR'] = $ERROR;

    header("Location: " . $_SERVER['REQUEST_URI'], true, 303);
    exit();
}

function displayError()
{
    global $ERROR;

    if (!empty($ERROR)) {
        echo "<div class=\"error\">
            <span class=\"closeButton\" onclick=\"this.parentElement.style.display='none';\">&times;</span>" .
            $ERROR .
            "</div>";
    }
}

function display()
{
    global $DB_OUTPUT;

    echo $DB_OUTPUT;
}

function isDisplayEmpty()
{
    global $DB_OUTPUT;

    return empty($DB_OUTPUT);
}

function displayQuestion()
{
    echo $_SESSION['edit_question'];
}

function displayVariant1()
{
    echo $_SESSION['edit_variant1'];
}

function displayVariant2()
{
    echo $_SESSION['edit_variant2'];
}

function displayVariant3()
{
    echo $_SESSION['edit_variant3'];
}

function displayVariant4()
{
    echo $_SESSION['edit_variant4'];
}

function displayAnswer($value)
{
    if ($value == $_SESSION['edit_answer']) {
        echo "checked";
    }
}
