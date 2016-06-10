<?php

require_once 'ListController.php';

header("Content-type:text/json;charset=utf8");

$liste = isset($_GET['liste']) ? $_GET['liste'] : null;

$controller = new ListController();

if ($liste == "crea") {
    $resultat = $controller->listAllCrea();
} else if ($liste == "mat") {
    $resultat = $controller->listAllMat();
} else if ($liste == "cat") {
    $resultat = $controller->listAllCat();
}
echo json_encode($resultat);