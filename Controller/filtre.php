<?php

require_once 'ListController.php';
header("Content-type:text/json;charset=utf8");

$createur = (isset($_GET['crea'])) ? $_GET['crea'] : "all";
$matiere = (isset($_GET['mat'])) ? $_GET['mat'] : "all";
$categorie = (isset($_GET['cat'])) ? $_GET['cat'] : "all";
$filtre = (isset($_GET['filtre'])) ? $_GET['filtre'] : null;

if ($filtre == 'crea') {
    $control = new ListController();
    $listeCrea = $control->listCrea($createur, $matiere, $categorie);
    echo json_encode($listeCrea);
} else if ($filtre == 'mat') {
    $control = new ListController();
    $listeMat = $control->listMat($matiere, $createur, $categorie);
    echo json_encode($listeMat);
} else if ($filtre == 'cat') {
    $control = new ListController();
    $listeCat = $control->listCat($categorie, $createur, $matiere);
    echo json_encode($listeCat);
}