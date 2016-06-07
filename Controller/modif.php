<?php

require_once 'TShirtController.php';
header("Content-type: text/json;charset=utf8");

$tee = new TShirtController();
$id = isset($_GET['data_id']) ? $_GET['data_id'] : null;
$data = $tee->filterTeesId($id);
echo json_encode($data);