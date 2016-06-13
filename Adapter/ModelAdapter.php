<?php

require_once("../Classes/ModelSize.php");

class ModelAdapter {

    private $list = [];
    private $complete = false;
    private $pdo;

    function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    function listAllSizes($id) {
        if (!$this->complete) {
            $sql = "SELECT exem_id AS idModel, "
                    . "exem_fk_tee AS idTshirt, "
                    . "exem_fk_tail AS sizeNumber, "
                    . "tail_nom AS sizeLetter, "
                    . "exem_stock AS number "
                    . "FROM exemplaires "
                    . "JOIN tailles ON tail_id = exem_fk_tail "
                    . "WHERE exem_fk_tee = :id;";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([':id' => $id]);
            $this->list = $stmt->fetchAll(PDO::FETCH_CLASS, "ModelSize");
            $this->complete = true;
        }
        return $this->list;
    }

    function insertModel($modSize, $teeId, $stock) {
        if (!$this->complete) {
            $sql = "INSERT INTO exemplaires VALUES ("
                    . "default, "
                    . ":teeId, "
                    . ":modSize, "
                    . ":stock );";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                ':teeId' => $teeId,
                ':modSize' => $modSize,
                ':stock' => $stock]);
            $this->complete = true;
        }
    }
    function deleteTshirt($idTshirt){
         if (!$this->complete) {
            $sql = "DELETE "
                    . "FROM exemplaires "
                    . "WHERE  exem_fk_tee = :a ";
            $stmt = $this->pdo->prepare($sql);
           $stmt->execute([":a" => $idTshirt]);
            $this->complete = true;
        }
    }

    

    function getIdModel($teeId, $teeSize) {
        if (!$this->complete) {
            $sql = "SELECT exem_id "
                    . "FROM exemplaires "
                    . "WHERE exem_fk_tee = :teeId "
                    . "AND exem_fk_tail = :teeSize;";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([':teeId' => $teeId, ':teeSize' => $teeSize]);
            $this->list = $stmt->fetchAll();
            $this->complete = TRUE;
        }
        return $this->list;
    }
    function updateExemplaire ($idExemplaire,$stock){
         if (!$this->complete) {
            $sql = "UPDATE exemplaires "
                    . "SET  exem_stock=:stock "
                    . "WHERE exem_id = :idExemplaire; ";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([':stock'=> $stock, ':idExemplaire'=>$idExemplaire]);
            $this->complete = TRUE;
        }
    }

}