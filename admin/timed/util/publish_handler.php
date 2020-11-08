<?php
require __DIR__ . '/../../global_util/db_connect.php';
require __DIR__ . '/../../global_util/errors.php';

require 'checker.php';
require 'constants.php';

function getCategory($category)
{
    global $MAIN_CATEGORIES;
    global $EDIT_CATEGORIES;    

    global $DB;
    global $conn;
    global $DB_OUTPUT;

    $sqlMain = "SELECT * FROM $DB.$MAIN_CATEGORIES WHERE category='$category'";
    $sqlEdit = "SELECT * FROM $DB.$EDIT_CATEGORIES WHERE category='$category'";    

    $resultMain = mysqli_query($conn, $sqlMain);
    $resultEdit = mysqli_query($conn, $sqlEdit);    

    $sql = "SELECT * FROM $DB.$category";
    $result = mysqli_query($conn, $sql);

    $DB_OUTPUT .= "<p style=\"font-size:24px;text-align:center;\">$category";

    if (mysqli_num_rows($resultMain) > 0) {
        $DB_OUTPUT .= " (production), questions - " . mysqli_num_rows($result) . ":</p>";
    } elseif (mysqli_num_rows($resultEdit) > 0) {
        $DB_OUTPUT .= " (edit), questions - " . mysqli_num_rows($result) . ":</p>";
    } else {
        $DB_OUTPUT .= " (finished), questions - " . mysqli_num_rows($result) . ":</p>";
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

    while ($row = mysqli_fetch_array($result)) {
        $answer = (int)$row['answer'];

        $DB_OUTPUT .= "<tr>";
        $DB_OUTPUT .= "<td class=\"tableId\">" . $row['id'] . "</td>";
        $DB_OUTPUT .= "<td>" . $row['question'] . "</td>";

        for ($i = 1; $i < 5; $i++) {
            if ($answer == $i) {
                $DB_OUTPUT .= "<td class=\"green_td\">" . $row['variant' . $i] . "</td>";
            } else {
                $DB_OUTPUT .= "<td>" . $row['variant' . $i] . "</td>";
            }
        }

        $DB_OUTPUT .= "<td>" . $row['answer'] . "</td>";
        $DB_OUTPUT .= "</tr>";
    }

    $DB_OUTPUT .= "</table>";
}

function getAll()
{
    getCategory($_SESSION['publish_category']);
}

function publish($category, $alias, $year, $month, $day, $hour, $minute, $second)
{
    global $MAIN_CATEGORIES;
    global $EDIT_CATEGORIES;
    global $QUESTION_LIMIT;

    global $DB;
    global $conn;

    $date = "$year-$month-$day-$hour-$minute-$second";

    if (!validateDate($date)) {
        getWrongDateError();
        return;
    }

    if (!checkQuestionsLowerNumber($category, $QUESTION_LIMIT)) {
        getNotEnoughTimedError($QUESTION_LIMIT);
        return;
    }

    $category = addslashes($category);
    $alias = addslashes($alias);

    $sqlAdd = "INSERT INTO $DB.$MAIN_CATEGORIES VALUES (NULL, '$category', '$alias', '$date')";
    $sqlDelEdit = "DELETE FROM $DB.$EDIT_CATEGORIES WHERE category='$category'";

    mysqli_query($conn, $sqlAdd);
    mysqli_query($conn, $sqlDelEdit);

    $_SESSION['SUCCESS'] = "<p style=\"font-size:30px; text-align:center;\">Quiz successfully published</p>";

    header("Location: timed_main.php", true, 303);
    exit();
}

function republish($category, $alias, $year, $month, $day, $hour, $minute, $second)
{
    global $MAIN_CATEGORIES;
    global $FINISHED_CATEGORIES;
    global $QUESTION_LIMIT;

    global $DB;
    global $conn;

    $date = "$year-$month-$day-$hour-$minute-$second";

    if (!validateDate($date)) {
        getWrongDateError();
        return;
    }

    if (!checkQuestionsLowerNumber($category, $QUESTION_LIMIT)) {
        getNotEnoughTimedError($QUESTION_LIMIT);
        return;
    }

    $category = addslashes(trim($category));
    $alias = addslashes(trim($alias));

    $sqlAdd = "INSERT INTO $DB.$MAIN_CATEGORIES VALUES (NULL, '$category', '$alias', '$date')";
    $sqlDelSub = "DELETE FROM $DB.$FINISHED_CATEGORIES WHERE category='$category'";

    mysqli_query($conn, $sqlAdd);
    mysqli_query($conn, $sqlDelSub);

    $_SESSION['SUCCESS'] = "<p style=\"font-size:30px; text-align:center;\">Quiz successfully republished</p>";

    header("Location: timed_main.php", true, 303);
    exit();
}

function unpublishAsk($category)
{
    global $CONFIRM;

    $CONFIRM = "<form autocomplete=\"off\" action=\"" . htmlspecialchars($_SERVER['PHP_SELF']) . "\" method=\"post\">                    
                    <input type=\"hidden\" name=\"unpublish_category\" value=" . "\"" . $category . "\">
                    <label class=\"title\" for=\"unpublish_confirm\">Unpublish \"" . $category . "\" quiz?</label>                    
                    <div class=\"publish_columns\">                    
                        <div class=\"column_left\">
                            <br>
                            <input class=\"confirm_button\" type=\"submit\" value=\"No\" name=\"unpublish_reject\">
                        </div>
                        <div class=\"column_right\">
                            <br>
                            <input class=\"confirm_button\" type=\"submit\" value=\"Yes\" name=\"unpublish_confirm\">
                        </div>
                    </div>    
                </form>";
}

function unpublish($category)
{
    global $MAIN_CATEGORIES;
    global $EDIT_CATEGORIES;

    global $DB;
    global $conn;

    $category = addslashes(trim($category));

    $sqlAddSub = "INSERT INTO $DB.$EDIT_CATEGORIES VALUES(NULL, '$category')";
    $sqlDel = "DELETE FROM $DB.$MAIN_CATEGORIES WHERE category='$category'";

    mysqli_query($conn, $sqlAddSub);
    mysqli_query($conn, $sqlDel);

    $_SESSION['SUCCESS'] = "<p style=\"font-size:30px; text-align:center;\">Quiz successfully unpublished</p>";

    header("Location: timed_main.php", true, 303);
    exit();
}

if (
    isset($_SESSION['DB_OUTPUT']) ||
    isset($_SESSION['ERROR']) ||
    isset($_SESSION['CONFIRM'])
) {
    $DB_OUTPUT = $_SESSION['DB_OUTPUT'];
    $ERROR = $_SESSION['ERROR'];
    $CONFIRM = $_SESSION['CONFIRM'];

    unset($_SESSION['DB_OUTPUT']);
    unset($_SESSION['ERROR']);
    unset($_SESSION['CONFIRM']);
} elseif ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (isset($_POST['publish'])) {
        if (
            !isset($_POST['publish_alias']) ||
            !isset($_POST['publish_year']) ||
            !isset($_POST['publish_month']) ||
            !isset($_POST['publish_day']) ||
            !isset($_POST['publish_hour']) ||
            !isset($_POST['publish_minute']) ||
            !isset($_POST['publish_second']) ||
            $_POST['publish_alias'] === "" ||
            $_POST['publish_year'] === "" ||
            $_POST['publish_month'] === "" ||
            $_POST['publish_day'] === "" ||
            $_POST['publish_hour'] === "" ||
            $_POST['publish_minute'] === "" ||
            $_POST['publish_second'] === ""
        ) {
            getEmptyError();
        } else {
            publish(
                $_SESSION['publish_category'],
                $_POST['publish_alias'],
                $_POST['publish_year'],
                $_POST['publish_month'],
                $_POST['publish_day'],
                $_POST['publish_hour'],
                $_POST['publish_minute'],
                $_POST['publish_second']
            );
        }
    } elseif (isset($_POST['republish'])) {
        if (
            !isset($_POST['republish_alias']) ||
            !isset($_POST['republish_year']) ||
            !isset($_POST['republish_month']) ||
            !isset($_POST['republish_day']) ||
            !isset($_POST['republish_hour']) ||
            !isset($_POST['republish_minute']) ||
            !isset($_POST['republish_second']) ||
            $_POST['republish_alias'] === "" ||
            $_POST['republish_year'] === "" ||
            $_POST['republish_month'] === "" ||
            $_POST['republish_day'] === "" ||
            $_POST['republish_hour'] === "" ||
            $_POST['republish_minute'] === "" ||
            $_POST['republish_second'] === ""
        ) {
            getEmptyError();
        } else {
            republish(
                $_SESSION['publish_category'],
                $_POST['republish_alias'],
                $_POST['republish_year'],
                $_POST['republish_month'],
                $_POST['republish_day'],
                $_POST['republish_hour'],
                $_POST['republish_minute'],
                $_POST['republish_second']
            );
        }
    } elseif (isset($_POST['unpublish'])) {
        unpublishAsk($_SESSION['publish_category']);
    } elseif (isset($_POST['unpublish_confirm'])) {
        unpublish($_SESSION['publish_category']);
    }

    $_SESSION['DB_OUTPUT'] = $DB_OUTPUT;
    $_SESSION['ERROR'] = $ERROR;
    $_SESSION['CONFIRM'] = $CONFIRM;

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

function displayConfirm()
{
    global $CONFIRM;

    if (!empty($CONFIRM)) {
        echo "<div class=\"confirm\">
            <span class=\"closeButton\" onclick=\"this.parentElement.style.display='none';\">&times;</span>" .
            $CONFIRM .
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
