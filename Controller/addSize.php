<?php

require_once 'ModelController.php';

$sizes = [];
$small = $_POST["small"];
$medium = $_POST['medium'];
$large = $_POST['large'];
$xlarge = $_POST['xlarge'];
$teeId = $_POST['tee_id'];
$sizes[1] = $small;
$sizes[2] = $medium;
$sizes[3] = $large;
$sizes[4] = $xlarge;

foreach($sizes as $key => $value) {
    $controller = new ModelController();
    $controller->createModel($key, $teeId, $value);
}