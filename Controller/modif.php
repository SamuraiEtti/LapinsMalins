<?php

require_once 'TShirtController.php';
require_once('ModelController.php');
require_once('../Classes/TShirt.php');

$op = $_GET['op'];
switch ($op) {
    case "affichage":
        header("Content-type: text/json;charset=utf8");
        $tee = new TShirtController();
        $id = isset($_GET['data_id']) ? $_GET['data_id'] : null;
        $data = $tee->filterTeesId($id);
        echo json_encode($data);
        break;

    case "modif":
        $data = "[]";
        $nom = $_GET['nom'];
        $prix = $_GET['prix'];
        $date = $_GET["date"];
        $description = $_GET['description'];
        $createur = $_GET['createur'];
        $matiere = $_GET['matiere'];
        $categorie = $_GET['categorie'];
        $imgListe = $_GET['imgListe'];
        $imgDetails = $_GET['imgDetails'];
        $tailleS = isset($_GET['tailleS']) ? $_GET['tailleS'] : "0";
        $tailleM = isset($_GET['tailleM']) ? $_GET['tailleM'] : "0";
        $tailleL = isset($_GET['tailleL']) ? $_GET['tailleL'] : "0";
        $tailleXL = isset($_GET['tailleXL']) ? $_GET['tailleXL'] : "0";
        $tailleS = isset($_GET['tailleS']) ? $_GET['tailleS'] : "0";
        $tailleM = isset($_GET['tailleM']) ? $_GET['tailleM'] : "0";
        $tailleL = isset($_GET['tailleL']) ? $_GET['tailleL'] : "0";
        $tailleXL = isset($_GET['tailleXL']) ? $_GET['tailleXL'] : "0";
        $id = $_GET['idTshirt'];
        $size = [];
        $size[1] = $tailleS;
        $size[2] = $tailleM;
        $size[3] = $tailleL;
        $size[4] = $tailleXL;
        $tshirt = new TShirt();
        $tshirt->newTee($nom, $prix, $date, $description, $imgDetails, $imgListe, $createur, $matiere, $categorie);

        $tee = new TShirtController();
        $tee->modification($tshirt, $id);
        foreach ($size as $key => $valeur) {
            $exemplaire = new ModelController();
            $idModel = $exemplaire->idModel($id, $key);
            $exemplaire->modification($idModel, $valeur);
            echo $valeur;
            echo $key;
            echo $idModel;
        }


        break;
}
