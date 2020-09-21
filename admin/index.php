<?php
if (!isset($_SESSION)) {
    session_start();
}

require 'login/util/login_handler.php';
?>

<!DOCTYPE HTML>
<html>

<head>
    <meta name="theme-color" content="#111111">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href='https://fonts.googleapis.com/css?family=Aldrich' rel='stylesheet'>
    <link rel="stylesheet" href="global_styles/styles.css">
    <link rel="stylesheet" href="login/styles/styles.css">

    <title>Quiz login</title>
    <link rel="icon" href="images/1.png">
</head>

<body>
    <div class="login_header">
        <span>Login page</span>
    </div>

    <div class="login_card">
        <?php
        displayError();
        ?>
        <div class="space"></div>
        <div class="login_question">
            <div class="login_title">
                <span>Login</span>
            </div>
            <form autocomplete="off" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
                <br>
                <label for="login_field">Your login:</label>
                <input class="green_text" type="text" name="login_field">
                <label for="password_field">Your password:</label>
                <input class="green_text" type="password" name="password_field">
                <div class="space"></div>
                <input class="white_submit" type="submit" value="login" name="login">
            </form>
        </div>
    </div>

</body>

</html>