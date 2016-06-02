<?php

require_once 'TShirtController.php';

header("Content-type:text/json;charset=utf8");

$tee = new TShirtController();
$liste = $tee->listall();
echo json_encode($liste);