<?php

class Category implements JsonSerializable {
    // Tout ce qui définit une catégorie
    private $id;
    private $nom;
    function getId() {
        return $this->id;
    }

    function getNom() {
        return $this->nom;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setNom($nom) {
        $this->nom = $nom;
    }

function jsonSerialize() {
    return[
        "id"=>$this->id,
        "nom"=>$this->nom
    ];
}
}
