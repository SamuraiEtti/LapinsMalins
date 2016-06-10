<?php

require_once __DIR__ . '/../Adapter/TShirtAdapter.php';
require_once __DIR__ . '/../Classes/TShirt.php';
require_once __DIR__ . '/../Adapter/DBConnection.php';

class TShirtController {

    function listall() {
        $connect = DBConnection::getInstance();
        $teeAd = new TShirtAdapter($connect);
        $allTees = $teeAd->listAllTshirt();
        return $allTees;
    }

    function filterTees($crea, $mat, $cat) {
        $connect = DBConnection::getInstance();
        $teeAd = new TShirtAdapter($connect);
        $liste = $teeAd->searchTShirtByFilters($crea, $mat, $cat);
        return $liste;
    }

    function listeBarRecherche($lettre) {
        $connect = DBConnection::getInstance();
        $teeAd = new TShirtAdapter($connect);
        $resultat = $teeAd->searchTShirtByName($lettre);
        return $resultat;
    }

    function filterTeesId($id) {
        $connect = DBConnection::getInstance();
        $teeAd = new TShirtAdapter($connect);
        $resultat = $teeAd->searchTshirtById($id);
        return $resultat;
    }
    
    function createTee($nom, $prix, $date, $description, $imgGd, $imgPt, $crea, $mat, $cat) {
        $connect = DBConnection::getInstance();
        $tee = new TShirt;
        $tee->newTee($nom, $prix, $date, $description, $imgGd, $imgPt, $crea, $mat, $cat);
        $teeAd = new TShirtAdapter($connect);
        $resultat = $teeAd->insertTshirt($tee);
        return $resultat;
    }

}
