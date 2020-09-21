<?php

$ERROR = "";
$SUCCESS = "";
$CONFIRM = "";

function getEmptyError()
{
    global $ERROR;

    $ERROR = "<p style=\"font-size:30px; text-align:center;\">Error: Input field is empty</p>";
}

function getDuplicateCategoryError()
{
    global $ERROR;

    $ERROR = "<p style=\"font-size:30px; text-align:center;\">Error: duplicate quiz system name</p>";
}

function getDuplicateQuestionError()
{
    global $ERROR;

    $ERROR = "<p style=\"font-size:30px; text-align:center;\">Error: duplicate question</p>";
}

function getQuestionLimitError($QuestionLimit)
{
    global $ERROR;    

    $ERROR = "<p style=\"font-size:30px; text-align:center;\">
    Error: questions limit of $QuestionLimit questions reached</p>";
}

function getNoSuchCategoryError()
{
    global $ERROR;

    $ERROR = "<p style=\"font-size:30px; text-align:center;\">
    Error: no such category exists</p>";
}

function getNoSuchEditCategoryError()
{
    global $ERROR;

    $ERROR = "<p style=\"font-size:30px; text-align:center;\">
    Error: no such edit category exists</p>";
}

function getNoSuchProdCategoryError()
{
    global $ERROR;

    $ERROR = "<p style=\"font-size:30px; text-align:center;\">
    Error: no such production category exists</p>";
}

function getNotEnoughTimedError($QuestionLimit)
{
    global $ERROR;    

    $ERROR = "<p style=\"font-size:30px; text-align:center;\">
    Error: expected $QuestionLimit questions</p>";
}

function getNotEnoughRandomError()
{
    global $ERROR;

    $ERROR = "<p style=\"font-size:30px; text-align:center;\">
    Error: expected at least 1 question</p>";
}

function getWrongDateError()
{
    global $ERROR;    

    $ERROR = "<p style=\"font-size:30px; text-align:center;\">
    Error: wrong start time entered</p>";
}

function getWhitespaceError()
{
    global $ERROR;

    $ERROR = "<p style=\"font-size:30px; text-align:center;\">
    Error: whitespaces are not allowed</p>";
}

function getWrongCredentialsError()
{
    global $ERROR;

    $ERROR = "<p style=\"font-size:20px; text-align:center;\">
    Error: wrong login or password</p>";
}

function getNoFileError()
{
    global $ERROR;

    $ERROR = "<p style=\"font-size:30px; text-align:center;\">
    Error: no file selected</p>";
}

function getFileSizeError()
{
    global $ERROR;

    $ERROR = "<p style=\"font-size:30px; text-align:center;\">
    Error: file size is more than 50KB</p>";
}

function getFileExtensionError()
{
    global $ERROR;

    $ERROR = "<p style=\"font-size:30px; text-align:center;\">
    Error: file extension must be either .txt or .csv</p>";
}

function debug($message)
{
    global $ERROR;

    $ERROR = "<p style=\"font-size:30px; text-align:center;\">$message</p>";
}