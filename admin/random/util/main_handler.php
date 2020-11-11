<?php
require __DIR__ . '/../../global_util/db_connect.php';
require __DIR__ . '/../../global_util/errors.php';

require 'checker.php';
require 'constants.php';

function getDeleteCell($category)
{
    return "<form autocomplete=\"off\" action=\"" . htmlspecialchars($_SERVER['PHP_SELF']) . "\" method=\"post\">                    
                    <input type=\"hidden\" name=\"delete_category\" value=" . "\"" . $category . "\">
                    <input class=\"red_submit\" type=\"submit\" value=\"Delete\" name=\"delete\">
                </form>";
}

function getPublishCell($category)
{
    return "<form autocomplete=\"off\" action=\"" . htmlspecialchars($_SERVER['PHP_SELF']) . "\" method=\"post\">                    
                    <input type=\"hidden\" name=\"publish_category\" value=" . "\"" . $category . "\">
                    <input class=\"green_submit\" type=\"submit\" value=\"View\" name=\"publish\">
                </form>";
}

function getUnpublishCell($category)
{
    return "<form autocomplete=\"off\" action=\"" . htmlspecialchars($_SERVER['PHP_SELF']) . "\" method=\"post\">                    
                    <input type=\"hidden\" name=\"unpublish_category\" value=" . "\"" . $category . "\">
                    <input class=\"green_submit\" type=\"submit\" value=\"View\" name=\"unpublish\">
                </form>";
}

function getQuestionsCell($category)
{
    return "<form autocomplete=\"off\" action=\"" . htmlspecialchars($_SERVER['PHP_SELF']) . "\" method=\"post\">                    
                    <input type=\"hidden\" name=\"questions_category\" value=" . "\"" . $category . "\">
                    <input class=\"blue_submit\" type=\"submit\" value=\"Edit\" name=\"questions\">
                </form>";
}

function getCategories($table, $alias, $what)
{
    global $DB;
    global $conn;
    global $DB_OUTPUT;

    $sql = "SELECT * FROM $DB.$table";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $DB_OUTPUT .= "<p style=\"font-size:24px;text-align:center;\">$alias:</p>";

        $DB_OUTPUT .= "<table>";
        $DB_OUTPUT .= "<tr>";
        $DB_OUTPUT .= "<th class=\"tableId\">Ind</th>";
        $DB_OUTPUT .= "<th>Quiz system name</th>";

        if ($what == "production") {
            $DB_OUTPUT .= "<th>Quiz ingame name</th>";
        }

        $DB_OUTPUT .= "<th class=\"tableButton\">Delete</th>";
        $DB_OUTPUT .= "<th class=\"tableButton\">Publish</th>";

        if ($what == "edit") {
            $DB_OUTPUT .= "<th class=\"tableButton\">Questions</th>";
        }

        $DB_OUTPUT .= "</tr>";

        $index = 0;

        while ($row = mysqli_fetch_array($result)) {
            $index++;

            $DB_OUTPUT .= "<tr>";
            $DB_OUTPUT .= "<td class=\"tableId\">" . $index . "</td>";
            $DB_OUTPUT .= "<td>" . $row['category'] . "</td>";

            if ($what == "production") {
                $DB_OUTPUT .= "<td>" . $row['alias'] . "</td>";
            }

            $DB_OUTPUT .= "<td class=\"tableButton\">" . getDeleteCell($row['category']) . "</td>";

            if ($what == "production") {
                $DB_OUTPUT .= "<td class=\"tableButton\">" . getUnpublishCell($row['category']) . "</td>";
            } elseif ($what == "edit") {
                $DB_OUTPUT .= "<td class=\"tableButton\">" . getPublishCell($row['category']) . "</td>";
                $DB_OUTPUT .= "<td class=\"tableButton\">" . getQuestionsCell($row['category']) . "</td>";
            }

            $DB_OUTPUT .= "</tr>";
        }
        $DB_OUTPUT .= "</table>";
    } else {
        $DB_OUTPUT .= "<p style=\"font-size:24px;text-align:center;\">$alias:<p>";
        $DB_OUTPUT .= "<p style=\"font-size:24px;text-align:center;\">Empty<p>";
    }
}

function getAll()
{
    global $MAIN_CATEGORIES;
    global $EDIT_CATEGORIES;

    getCategories($MAIN_CATEGORIES, "Production quizzes", "production");
    getCategories($EDIT_CATEGORIES, "Edit quizzes", "edit");
}

function addCategory($category)
{
    global $EDIT_CATEGORIES;

    global $DB;
    global $conn;

    global $SUCCESS;

    if (strpos($category, ' ') !== false) {
        getWhitespaceError();
        return;
    }

    if (checkDuplicateCategory($category)) {
        getDuplicateCategoryError();
        return;
    }

    $category = addslashes(trim($category));

    $sqlCreate = "CREATE TABLE $DB.$category (
        id INT PRIMARY KEY AUTO_INCREMENT, 
        question VARCHAR(100), 
        variant4 VARCHAR(50), 
        variant3 VARCHAR(50), 
        variant2 VARCHAR(50), 
        variant1 VARCHAR(50), 
        answer INT)";

    $category = addslashes($category);
    $sqlAdd = "INSERT INTO $DB.$EDIT_CATEGORIES VALUES (NULL, '$category')";

    mysqli_begin_transaction($conn);

    if (mysqli_query($conn, $sqlCreate) && mysqli_query($conn, $sqlAdd)) {
        mysqli_commit($conn);
        $SUCCESS = "<p style=\"font-size:30px; text-align:center;\">Quiz successfully added</p>";
    } else {
        mysqli_rollback($conn);
        getSomethingWentWrongError();
    }

    getAll();
}

function deleteCategoryAsk($category)
{
    global $CONFIRM;

    $CONFIRM = "<form autocomplete=\"off\" action=\"" . htmlspecialchars($_SERVER['PHP_SELF']) . "\" method=\"post\">                    
                    <input type=\"hidden\" name=\"delete_category\" value=" . "\"" . $category . "\">
                    <label class=\"title\" for=\"delete_confirm\">Delete \"" . $category . "\" quiz?</label>                    
                    <div class=\"publish_columns\">                    
                        <div class=\"column_left\">
                            <br>
                            <input class=\"confirm_button\" type=\"submit\" value=\"No\" name=\"delete_reject\">
                        </div>
                        <div class=\"column_right\">
                            <br>
                            <input class=\"confirm_button\" type=\"submit\" value=\"Yes\" name=\"delete_confirm\">
                        </div>
                    </div>    
                </form>";
}

function deleteCategory($category)
{
    global $MAIN_CATEGORIES;
    global $EDIT_CATEGORIES;

    global $DB;
    global $conn;

    global $SUCCESS;

    $category = addslashes(trim($category));

    $sqlDel = "DELETE FROM $DB.$MAIN_CATEGORIES WHERE category='$category'";
    $sqlDelEdit = "DELETE FROM $DB.$EDIT_CATEGORIES WHERE category='$category'";
    $sqlDrop = "DROP TABLE $DB.$category";

    mysqli_begin_transaction($conn);

    if (mysqli_query($conn, $sqlDel) &&
    mysqli_query($conn, $sqlDelEdit) &&
    mysqli_query($conn, $sqlDrop)) {
        mysqli_commit($conn);
        $SUCCESS = "<p style=\"font-size:30px; text-align:center;\">Quiz successfully deleted</p>";
    } else {
        mysqli_rollback($conn);
        getSomethingWentWrongError();
    }

    getAll();
}

function publish($category)
{
    $_SESSION['publish_category'] = $category;

    header("Location: random_publish.php", true, 303);
    exit();
}

function unpublish($category)
{
    $_SESSION['publish_category'] = $category;

    header("Location: random_unpublish.php", true, 303);
    exit();
}

function questions($category)
{
    $_SESSION['questions_category'] = $category;

    header("Location: random_questions.php", true, 303);
    exit();
}

if (
    isset($_SESSION['DB_OUTPUT']) ||
    isset($_SESSION['ERROR']) ||
    isset($_SESSION['SUCCESS']) ||
    isset($_SESSION['CONFIRM'])
) {
    $DB_OUTPUT = $_SESSION['DB_OUTPUT'];
    $ERROR = $_SESSION['ERROR'];
    $SUCCESS = $_SESSION['SUCCESS'];
    $CONFIRM = $_SESSION['CONFIRM'];

    unset($_SESSION['DB_OUTPUT']);
    unset($_SESSION['ERROR']);
    unset($_SESSION['SUCCESS']);
    unset($_SESSION['CONFIRM']);
} elseif ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (isset($_POST['add'])) {
        if (!isset($_POST['add_category']) || $_POST['add_category'] === "") {
            getEmptyError();
        } else {
            addCategory($_POST['add_category']);
        }
    } elseif (isset($_POST['delete'])) {
        deleteCategoryAsk($_POST['delete_category']);
    } elseif (isset($_POST['delete_confirm'])) {
        deleteCategory($_POST['delete_category']);
    } elseif (isset($_POST['publish'])) {
        publish($_POST['publish_category']);
    } elseif (isset($_POST['unpublish'])) {
        unpublish($_POST['unpublish_category']);
    } elseif (isset($_POST['questions'])) {
        questions($_POST['questions_category']);
    }

    $_SESSION['DB_OUTPUT'] = $DB_OUTPUT;
    $_SESSION['ERROR'] = $ERROR;
    $_SESSION['SUCCESS'] = $SUCCESS;
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

function displaySuccess()
{
    global $SUCCESS;

    if (!empty($SUCCESS)) {
        echo "<div class=\"success\">
            <span class=\"closeButton\" onclick=\"this.parentElement.style.display='none';\">&times;</span>" .
            $SUCCESS .
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

function isDBOutputEmpty()
{
    global $DB_OUTPUT;

    return empty($DB_OUTPUT);
}

function display()
{
    global $DB_OUTPUT;

    echo $DB_OUTPUT;
}
