<?php

require_once("../Classes/ModelSize.php");

class ModelAdapter {

    private $list = [];
    private $complete = false;
    private $pdo;
    
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
            $stmt->execute([':id'=>$id]);
            $this->list = $stmt->fetchAll(PDO::FETCH_CLASS, "ModelSize");
            $this->complete = true;
        }
        return $this->list;
    }

}
