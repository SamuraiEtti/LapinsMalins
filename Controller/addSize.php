<?php

require_once 'ModelController.php';

$sizes = [];
$small = isset($_POST["small"]) ? $_POST["small"]:"0";
$medium = isset($_POST['medium'])? $_POST["medium"]:"0";
$large = isset($_POST['large']) ? $_POST["large"]:"0";
$xlarge = isset($_POST['xlarge']) ? $_POST["xlarge"]:"0";
$teeId = $_POST['tee_id'];
$sizes[1] = $small;
$sizes[2] = $medium;
$sizes[3] = $large;
$sizes[4] = $xlarge;

foreach($sizes as $key => $value) {
    $controller = new ModelController();
    $controller->createModel($key, $teeId, $value);
}