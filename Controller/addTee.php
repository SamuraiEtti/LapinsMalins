<?php

require_once 'TShirtController.php';

$nom = $_POST['nom'];
$prix = $_POST['prix'];
$date = $_POST['date'];
$description = $_POST['description'];
$crea = $_POST['createur'];
$mat = $_POST['matiere'];
$cat = $_POST['categorie'];
$imgGd = $_POST['imgDetails'];
$imgPt = $_POST['imgListe'];

$tee = new TShirtController();
$id = $tee->createTee($nom, $prix, $date, $description, $imgGd, $imgPt, $crea, $mat, $cat);
echo $id;