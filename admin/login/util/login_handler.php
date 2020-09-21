<?php
require __DIR__ . '/../../global_util/errors.php';

$valid_passwords = array("quizzer" => "quizCraft20");
$valid_users = array_keys($valid_passwords);

function checkCredentials($user, $pass)
{
    global $valid_users;
    global $valid_passwords;

    return (in_array($user, $valid_users)) && ($pass == $valid_passwords[$user]);
}

function login()
{
    $user = $_POST['login_field'];
    $pass = $_POST['password_field'];

    $_SESSION['loginSession'] = $user;
    $_SESSION['validated'] = checkCredentials($user, $pass);

    if ($_SESSION['validated'] == false)
    {
        getWrongCredentialsError();
    }
}

if (isset($_SESSION['ERROR'])) {
    $ERROR = $_SESSION['ERROR'];
    
    unset($_SESSION['ERROR']);    
}

if (isset($_SESSION['loginSession'])) {
    redirectIfValidated();

    session_unset();
    session_destroy();
} elseif ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (isset($_POST['login'])) {
        login();
    }

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

function redirectIfValidated()
{
    if ($_SESSION['validated']) {
        header("Location: ../../timed/timed_main.php");
        exit();
    }
}
