<?php

function checkDuplicateCategory($category)
{
    global $DB;
    global $conn;

    $sqlProd = "SHOW TABLES FROM $DB LIKE '$category'";

    $result = mysqli_query($conn, $sqlProd);

    if (mysqli_num_rows($result) > 0) {
        return true;
    }

    return false;
}

function checkQuestionsLowerNumber($category, $QuestionsLimit)
{
    global $DB;
    global $conn;

    $sql = "SELECT * FROM $DB.$category";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) < $QuestionsLimit) {
        return false;
    }

    return true;
}

function checkQuestionsUpperNumber($category, $QuestionsLimit)
{
    global $DB;
    global $conn;

    $sql = "SELECT * FROM $DB.$category";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) >= $QuestionsLimit) {
        return false;
    }

    return true;
}

function checkDuplicateQuestion($category, $question)
{
    global $DB;
    global $conn;

    $sql = "SELECT * FROM $DB.$category WHERE question='$question'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        return false;
    }

    return true;
}

function validateDate($date, $format = 'Y-n-j-H-i-s')
{
    $d = DateTime::createFromFormat($format, $date);

    return $d && $d->format($format) == $date;
}

function checkFileSize($file)
{    
    if ($file['size'] == 0 || $file['size'] > 50000) {        
        return false;
    }

    return true;
}

function checkFileExtension($file)
{
    $fileExt = strtolower(end(explode('.', $file['name'])));

    $extensions = ["txt", "csv"];

    if (in_array($fileExt, $extensions) == false) {
        return false;
    }

    return true;
}