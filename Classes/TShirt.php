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

    function jsonSerialize() {
        return [
            "id" => $this->id,
            "nom"=> $this->nom,
            "prix"=>$this->prix,
            "date"=>$this->date,
            "description"=>$this->description,
            "createur"=>$this->createur,
            "matiere"=>$this->matiere,
            "categorie"=>$this->categorie,
            "imgListe"=>  $this->imgListe,
            "imgDetails"=>  $this->imgDetails
        ];
    }
}
