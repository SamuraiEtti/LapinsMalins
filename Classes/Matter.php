<?php

class Matter implements JsonSerializable {
    // Tout ce qui définit une matière
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

//rajouter pour chacune une implemntation de json serializable et une fonction json serialize
    //faire un return de tout
    function jsonSerialize() {
        return[
            "id"=>$this->id,
            "nom"=>$this->nom
        ];
    }
}
