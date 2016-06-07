<?php

require_once 'TShirtController.php';
require_once 'ModelController.php';

$nom = $_GET['nom'];
$prix = $_GET['prix'];
$date = $_GET['date'];
$description = $_GET['description'];
$crea = $_GET['createur'];
$mat = $_GET['matiere'];
$cat = $_GET['categorie'];
$imgGd = $_GET['imgDetails'];
$imgPt = $_GET['imgListe'];

$tee = new TShirtController();
$tee->createTee($nom, $prix, $date, $description, $imgGd, $imgPt, $crea, $mat, $cat);
