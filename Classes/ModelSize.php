<?php

class ModelSize implements JsonSerializable {
    private $idModel;
    private $idTshirt;
    private $size;
    private $number;
    
    function getIdModel() {
        return $this->idModel;
    }

    function getIdTshirt() {
        return $this->idTshirt;
    }

    function getSize() {
        return $this->size;
    }

    function getNumber() {
        return $this->number;
    }

    function setIdModel($idModel) {
        $this->idModel = $idModel;
    }

    function setIdTshirt($idTshirt) {
        $this->idTshirt = $idTshirt;
    }

    function setSize($size) {
        $this->size = $size;
    }

    function setNumber($number) {
        $this->number = $number;
    }
function jsonSerialize() {
    return[
        "idModel"=>$this->idModel,
        "idTshirt"=>$this->idTshirt,
        "size"=>$this->size,
        "number"=>$this->number
    ];
}
}
