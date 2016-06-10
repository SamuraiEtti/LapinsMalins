<?php

class TShirt implements JsonSerializable {

    private $id;
    private $nom;
    private $prix;
    private $date;
    private $description;
    private $createur;
    private $matiere;
    private $categorie;
    private $imgListe;
    private $imgDetails;
    private $small;
    private $medium;
    private $large;
    private $xlarge;

    function newTee($nom, $prix, $date, $description, $imgGd, $imgPt, $crea, $mat, $cat) {
        $this->setNom($nom);
        $this->setPrix($prix);
        $this->setDate($date);
        $this->setDescription($description);
        $this->setImgDetails($imgGd);
        $this->setImgListe($imgPt);
        $this->setCreateur($crea);
        $this->setMatiere($mat);
        $this->setCategorie($cat);
    }

    function getId() {
        return $this->id;
    }

    function getNom() {
        return $this->nom;
    }

    function getPrix() {
        return $this->prix;
    }

    function getDate() {
        return $this->date;
    }

    function getDescription() {
        return $this->description;
    }

    function getCreateur() {
        return $this->createur;
    }

    function getMatiere() {
        return $this->matiere;
    }

    function getCategorie() {
        return $this->categorie;
    }

    function getImgListe() {
        return $this->imgListe;
    }

    function getImgDetails() {
        return $this->imgDetails;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setNom($nom) {
        $this->nom = $nom;
    }

    function setPrix($prix) {
        $this->prix = $prix;
    }

    function setDate($date) {
        $this->date = $date;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function setCreateur($createur) {
        $this->createur = $createur;
    }

    function setMatiere($matiere) {
        $this->matiere = $matiere;
    }

    function setCategorie($categorie) {
        $this->categorie = $categorie;
    }

    function setImgListe($imgListe) {
        $this->imgListe = $imgListe;
    }

    function setImgDetails($imgDetails) {
        $this->imgDetails = $imgDetails;
    }

    function getSmall() {
        return $this->small;
    }

    function getMedium() {
        return $this->medium;
    }

    function getLarge() {
        return $this->large;
    }

    function getXlarge() {
        return $this->xlarge;
    }

    function setSmall($small) {
        $this->small = $small;
    }

    function setMedium($medium) {
        $this->medium = $medium;
    }

    function setLarge($large) {
        $this->large = $large;
    }

    function setXlarge($xlarge) {
        $this->xlarge = $xlarge;
    }

    function jsonSerialize() {
        return [
            "id" => $this->id,
            "nom" => $this->nom,
            "prix" => $this->prix,
            "date" => $this->date,
            "description" => $this->description,
            "createur" => $this->createur,
            "matiere" => $this->matiere,
            "categorie" => $this->categorie,
            "imgListe" => $this->imgListe,
            "imgDetails" => $this->imgDetails,
            "t_small" =>  $this->small,
            "t_medium" => $this->medium,
            "t_large" => $this->large,
            "t_xlarge" => $this->xlarge
        ];
    }

}
