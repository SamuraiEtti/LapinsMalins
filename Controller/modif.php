<?php

require_once 'TShirtController.php';
require_once('ModelController.php');
header("Content-type: text/json;charset=utf8");
$op = $_GET['op'];
switch ($op) {
    case "affichage":
    $tee = new TShirtController();
    $id = isset($_GET['data_id']) ? $_GET['data_id'] : null;
    $data = $tee->filterTeesId($id);
    echo json_encode($data);
    break;
    case "modif":
    $nom = $_GET['nom'];
    $prix = $_GET['prix'];
    $date = $_GET["date"];
    $description = $_GET['description'];
    $createur = $_GET['createur'];
    $matiere = $_GET['matiere'];
    $categorie = $_GET['categorie'];
    $imgListe = $_GET['imgListe'];
    $imgDetails = $_GET['imgDetails'];
    $tailleS = $_GET['tailleS'];
    $tailleM = $_GET['tailleM'];
    $tailleL = $_GET['tailleL'];
    $tailleXL = $_GET['tailleXL'];
    $id = $_GET['idTshirt'];

    $tee = new TShirtController();
    $tee->modification($nom, $prix, $date, $description, $createur, $matiere, $categorie, $imgListe, $imgDetails, $tailleS, $tailleM, $tailleL, $tailleXL);
    $exemplaire = new ModelController();
    $exemplaire->modification($nom, $prix, $date, $description, $createur, $matiere, $categorie, $imgListe, $imgDetails, $tailleS, $tailleM, $tailleL, $tailleXL);
    break;
}

