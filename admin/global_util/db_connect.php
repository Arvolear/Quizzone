<?php
$servername = "localhost";
$username = "quizzer";
$password = "quiz4All";
$DB = "quiz";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}