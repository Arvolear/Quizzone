<?php
require __DIR__ . '/../../global_util/db_connect.php';
require __DIR__ . '/../../global_util/errors.php';

require 'checker.php';
require 'constants.php';

$_SESSION['CLEAR_IMPORTED'] = true;

function getDeleteCell($id)
{
    return "<form autocomplete=\"off\" action=\"" . htmlspecialchars($_SERVER['PHP_SELF']) . "\" method=\"post\">                    
                    <input type=\"hidden\" name=\"delete_question\" value=" . "\"" . $id . "\">
                    <input class=\"red_submit\" type=\"submit\" value=\"Delete\" name=\"delete\">
                </form>";
}

function getEditCell($id)
{
    return "<form autocomplete=\"off\" action=\"" . htmlspecialchars($_SERVER['PHP_SELF']) . "\" method=\"post\">                    
                    <input type=\"hidden\" name=\"edit_question\" value=" . "\"" . $id . "\">
                    <input class=\"blue_submit\" type=\"submit\" value=\"Edit\" name=\"edit\">
                </form>";
}

function getCategory($category)
{
    global $EDIT_CATEGORIES;

    global $DB;
    global $conn;
    global $DB_OUTPUT;

    $sqlEdit = "SELECT * FROM $DB.$EDIT_CATEGORIES WHERE category='$category'";

    $resultEdit = mysqli_query($conn, $sqlEdit);

    $sql = "SELECT * FROM $DB.$category";
    $result = mysqli_query($conn, $sql);

    $DB_OUTPUT .= "<p style=\"font-size:24px;text-align:center;\">$category";

    if (mysqli_num_rows($resultEdit) > 0) {
        $DB_OUTPUT .= " (edit), questions - " . mysqli_num_rows($result) . ":</p>";
    } else {
        $DB_OUTPUT .= " (finished), questions - " . mysqli_num_rows($result) . ":</p>";
    }

    if (mysqli_num_rows($result) > 0) {
        $DB_OUTPUT .= "<table>";
        $DB_OUTPUT .= "<tr>";
        $DB_OUTPUT .= "<th class=\"tableId\">Ind</th>";
        $DB_OUTPUT .= "<th>Question</th>";
        $DB_OUTPUT .= "<th>Variant1</th>";
        $DB_OUTPUT .= "<th>Variant2</th>";
        $DB_OUTPUT .= "<th>Variant3</th>";
        $DB_OUTPUT .= "<th>Variant4</th>";
        $DB_OUTPUT .= "<th>Answer</th>";

        $DB_OUTPUT .= "<th class=\"tableButton\">Delete</th>";
        $DB_OUTPUT .= "<th class=\"tableButton\">Edit</th>";

        $DB_OUTPUT .= "</tr>";

        $index = 0;

        while ($row = mysqli_fetch_array($result)) {
            $index++;

            $answer = (int)$row['answer'];

            $DB_OUTPUT .= "<tr>";
            $DB_OUTPUT .= "<td class=\"tableId\">" . $index . "</td>";
            $DB_OUTPUT .= "<td>" . $row['question'] . "</td>";
            
            for ($i = 1; $i < 5; $i++) {
                if ($answer == $i) {
                    $DB_OUTPUT .= "<td class=\"green_td\">" . $row['variant' . $i] . "</td>";
                } else {
                    $DB_OUTPUT .= "<td>" . $row['variant' . $i] . "</td>";
                }
            }

            $DB_OUTPUT .= "<td>" . $row['answer'] . "</td>";

            $DB_OUTPUT .= "<td class=\"tableButton\">" . getDeleteCell($row['id']) . "</td>";
            $DB_OUTPUT .= "<td class=\"tableButton\">" . getEditCell($row['id']) . "</td>";

            $DB_OUTPUT .= "</tr>";
        }

        $DB_OUTPUT .= "</table>";
    } else {
        $DB_OUTPUT .= "<p style=\"font-size:24px;text-align:center;\">Empty<p>";
    }
}

function getAll()
{
    getCategory($_SESSION['questions_category']);
}

function addQuestion($category, $question, $variant1, $variant2, $variant3, $variant4, $index, $answer)
{
    global $DB;
    global $conn;
    global $QUESTION_LIMIT;

    global $SUCCESS;

    if (!checkQuestionsUpperNumber($category, $QUESTION_LIMIT)) {
        getQuestionLimitError($QUESTION_LIMIT);
        return;
    }

    if (!checkDuplicateQuestion($category, $question)) {
        getDuplicateQuestionError();
        return;
    }

    $question = addslashes(trim($question));
    $variant1 = addslashes(trim($variant1));
    $variant2 = addslashes(trim($variant2));
    $variant3 = addslashes(trim($variant3));
    $variant4 = addslashes(trim($variant4));

    $sqlIns = "INSERT INTO $DB.$category VALUES (NULL, '$question', '$variant4', '$variant3', '$variant2', '$variant1', $answer)";

    mysqli_begin_transaction($conn);

    if (mysqli_query($conn, $sqlIns)) {
        $types = ['question', 'variant1', 'variant2', 'variant3', 'variant4', 'answer'];

        for ($j = 0; $j < count($types); $j++) {
            unset($_SESSION[$types[$j] . $index]);
        }

        mysqli_commit($conn);
        $SUCCESS = "<p style=\"font-size:30px; text-align:center;\">Question succesfully added</p>";
    } else {
        mysqli_rollback($conn);
        getSomethingWentWrongError();
    }

    $_SESSION['CLEAR_IMPORTED'] = false;

    getAll();
}

function editQuestion($category, $id)
{
    global $DB;
    global $conn;

    $sqlEdit = "SELECT * FROM $DB.$category WHERE id=$id";

    $resultEdit = mysqli_query($conn, $sqlEdit);
    $row = mysqli_fetch_array($resultEdit);

    $_SESSION['edit_category'] = $category;
    $_SESSION['edit_id'] = $id;
    $_SESSION['edit_question'] = $row['question'];
    $_SESSION['edit_variant1'] = $row['variant1'];
    $_SESSION['edit_variant2'] = $row['variant2'];
    $_SESSION['edit_variant3'] = $row['variant3'];
    $_SESSION['edit_variant4'] = $row['variant4'];
    $_SESSION['edit_answer'] = $row['answer'];

    header("Location: random_question.php", true, 303);
    exit();
}

function deleteQuestionAsk($category, $id)
{
    global $CONFIRM;

    global $DB;
    global $conn;

    $sql = "SELECT * FROM $DB.$category WHERE id=$id";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);

    $CONFIRM = "<form autocomplete=\"off\" action=\"" . htmlspecialchars($_SERVER['PHP_SELF']) . "\" method=\"post\">                    
                    <input type=\"hidden\" name=\"delete_question\" value=" . "\"" . $id . "\">
                    <label class=\"title\" for=\"delete_confirm\">Delete \"" . $row['question'] . "\" question?</label>                    
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

    $_SESSION['CLEAR_IMPORTED'] = false;
}

function deleteQuestion($category, $id)
{
    global $DB;
    global $conn;

    global $SUCCESS;

    $sqlDel = "DELETE FROM $DB.$category WHERE id='$id'";

    mysqli_begin_transaction($conn);

    if (mysqli_query($conn, $sqlDel)) {
        mysqli_commit($conn);
        $SUCCESS = "<p style=\"font-size:30px; text-align:center;\">Question successfully deleted</p>";
    } else {
        mysqli_rollback($conn);
        getSomethingWentWrongError();
    }

    $_SESSION['CLEAR_IMPORTED'] = false;

    getAll();
}

function importQuestions($file, $shuffle)
{
    global $QUESTION_LIMIT;
    global $DELIMITER;

    if (!checkFileSize($file)) {
        getFileSizeError();
        return;
    }

    if (!checkFileExtension($file)) {
        getFileExtensionError();
        return;
    }

    $types = ['question', 'variant1', 'variant2', 'variant3', 'variant4', 'answer'];

    for ($i = 0; $i < $QUESTION_LIMIT; $i++) {
        for ($j = 0; $j < count($types); $j++) {
            unset($_SESSION[$types[$j] . $i]);
        }
    }

    // $csv = array_map('str_getcsv', file($file['tmp_name']));

    $tempFile = tmpfile();
    fwrite($tempFile, file_get_contents($file['tmp_name']));
    fseek($tempFile, 0);

    $csv = array();

    while (($csvColumns = fgetcsv($tempFile, 0, $DELIMITER)) !== false) {
        $csv[] = $csvColumns;
    }

    if (!empty($shuffle)) {
        shuffle($csv);
    }

    for ($i = 0; $i < min(count($csv), $QUESTION_LIMIT); $i++) {
        $answer = count($csv[$i]) == 6 ? (int)$csv[$i][5] : 1;
        $localAnswer = -1;

        if ($answer < 1 || $answer > 4) {
            $answer = 1;
        }

        if (!empty($shuffle)) {
            $variants = [];

            for ($j = 1; $j < min(5, count($csv[$i])); $j++) {
                array_push($variants, $csv[$i][$j]);
            }

            shuffle($variants);

            for ($j = 0; $j < count($variants); $j++) {
                if ($csv[$i][$answer] == $variants[$j]) {
                    $localAnswer = ($j + 1);
                }
            }

            for ($j = 0; $j < count($variants); $j++) {
                $csv[$i][($j + 1)] = $variants[$j];
            }
        }

        for ($j = 0; $j < min(count($csv[$i]), count($types)); $j++) {
            $_SESSION[$types[$j] . $i] = trim($csv[$i][$j]);
        }

        $_SESSION['answer' . $i] = empty($shuffle) ? $answer : $localAnswer;
    }

    $_SESSION['CLEAR_IMPORTED'] = false;
}

if (
    isset($_SESSION['DB_OUTPUT']) ||
    isset($_SESSION['ERROR']) ||
    isset($_SESSION['SUCCESS']) ||
    isset($_SESSION['CONFIRM']) ||
    isset($_SESSION['FROM_QUESTION_EDIT'])
) {
    $DB_OUTPUT = $_SESSION['DB_OUTPUT'];
    $ERROR = $_SESSION['ERROR'];
    $SUCCESS = $_SESSION['SUCCESS'];
    $CONFIRM = $_SESSION['CONFIRM'];

    $_SESSION['CLEAR_IMPORTED'] = false;

    unset($_SESSION['DB_OUTPUT']);
    unset($_SESSION['ERROR']);
    unset($_SESSION['SUCCESS']);
    unset($_SESSION['CONFIRM']);
    unset($_SESSION['FROM_QUESTION_EDIT']);
} elseif ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (isset($_POST['import'])) {
        if (empty($_FILES['import_questions']['name'])) {
            getNoFileError();
        } else {
            importQuestions(
                $_FILES['import_questions'],
                $_POST['shuffle']
            );
        }
    } elseif (isset($_POST['add'])) {
        if (
            !isset($_POST['add_question']) ||
            !isset($_POST['add_variant1']) ||
            !isset($_POST['add_variant2']) ||
            !isset($_POST['add_variant3']) ||
            !isset($_POST['add_variant4']) ||
            $_POST['add_question'] === "" ||
            $_POST['add_variant1'] === "" ||
            $_POST['add_variant2'] === "" ||
            $_POST['add_variant3'] === "" ||
            $_POST['add_variant4'] === ""
        ) {
            getEmptyError();
        } else {
            addQuestion(
                $_SESSION['questions_category'],
                $_POST['add_question'],
                $_POST['add_variant1'],
                $_POST['add_variant2'],
                $_POST['add_variant3'],
                $_POST['add_variant4'],
                $_POST['add_index'],
                $_POST['add_answer']
            );
        }
    } elseif (isset($_POST['delete'])) {
        deleteQuestionAsk(
            $_SESSION['questions_category'],
            $_POST['delete_question']
        );
    } elseif (isset($_POST['delete_confirm'])) {
        deleteQuestion(
            $_SESSION['questions_category'],
            $_POST['delete_question']
        );
    } elseif (isset($_POST['edit'])) {
        editQuestion(
            $_SESSION['questions_category'],
            $_POST['edit_question']
        );
    }

    $_SESSION['DB_OUTPUT'] = $DB_OUTPUT;
    $_SESSION['ERROR'] = $ERROR;
    $_SESSION['SUCCESS'] = $SUCCESS;
    $_SESSION['CONFIRM'] = $CONFIRM;

    header("Location: " . $_SERVER['REQUEST_URI'], true, 303);
    exit();
}

if (isset($_SESSION['CLEAR_IMPORTED']) && $_SESSION['CLEAR_IMPORTED'] == true) {
    $types = ['question', 'variant1', 'variant2', 'variant3', 'variant4', 'answer'];

    for ($i = 0; $i < $QUESTION_LIMIT; $i++) {
        for ($j = 0; $j < count($types); $j++) {
            unset($_SESSION[$types[$j] . $i]);
        }
    }

    unset($_SESSION['CLEAR_IMPORTED']);
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

function checkAnswer($questionNum, $id)
{
    if ($_SESSION['answer' . $questionNum] == $id) {
        return "checked";
    }

    if ($id == 1) {
        return "checked";
    }

    return "";
}

function displayImportedQuestions()
{
    global $QUESTION_LIMIT;

    for ($i = 0; $i < $QUESTION_LIMIT; $i++) {
        if (!empty($_SESSION['question' . $i])) {
            echo "<div class=\"card\">
                    <div class=\"card_question\">
                        <span class=\"title\">Imported Question " . ($i + 1) . "</span>
                        <form autocomplete=\"off\" action=\"" . htmlspecialchars($_SERVER['PHP_SELF']) . "\" method=\"post\">
                            <br>
                            <label for=\"add_question\">Question:</label>
                            <input class=\"green_text\" type=\"text\" name=\"add_question\" value=\"" . $_SESSION['question' . $i] . "\">

                            <div class=\"add_columns\">
                                <div class=\"column_left\">
                                    <label for=\"add_variant1\">Variant 1:</label>
                                    <input class=\"green_text\" type=\"text\" name=\"add_variant1\" value=\"" . $_SESSION['variant1' . $i] . "\">

                                    <label for=\"add_variant3\">Variant 3:</label>
                                    <input class=\"green_text\" type=\"text\" name=\"add_variant3\" value=\"" . $_SESSION['variant3' . $i] . "\">
                                </div>

                                <div class=\"column_right\">
                                    <label for=\"add_variant2\">Variant 2:</label>
                                    <input class=\"green_text\" type=\"text\" name=\"add_variant2\" value=\"" . $_SESSION['variant2' . $i] . "\">

                                    <label for=\"add_variant4\">Variant 4:</label>
                                    <input class=\"green_text\" type=\"text\" name=\"add_variant4\" value=\"" . $_SESSION['variant4' . $i] . "\">
                                </div>
                            </div>

                            <span class=\"normal\">Answer:</span>
                            <div class=\"grid\">
                                <label class=\"radio_label\">1
                                    <input class=\"green_radio\" type=\"radio\" name=\"add_answer\" value=\"1\" " . checkAnswer($i, 1) . ">
                                </label>

                                <label class=\"radio_label\">2
                                    <input class=\"green_radio\" type=\"radio\" name=\"add_answer\" value=\"2\" " . checkAnswer($i, 2) . ">
                                </label>

                                <label class=\"radio_label\">3
                                    <input class=\"green_radio\" type=\"radio\" name=\"add_answer\" value=\"3\" " . checkAnswer($i, 3) . ">
                                </label>

                                <label class=\"radio_label\">4
                                    <input class=\"green_radio\" type=\"radio\" name=\"add_answer\" value=\"4\" " . checkAnswer($i, 4) . ">
                                </label>
                            </div>
                            <div class=\"space\"></div>

                            <input type=\"hidden\" value=\"" . $i . "\" name=\"add_index\">
                            <input class=\"green_submit\" type=\"submit\" value=\"Add\" name=\"add\">
                        </form>
                    </div>
                </div>";
        }
    }
}
