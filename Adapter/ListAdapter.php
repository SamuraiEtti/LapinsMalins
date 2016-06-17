<?php

require_once("DBConnection.php");
require_once("../Classes/Category.php");
require_once("../Classes/Creator.php");
require_once("../Classes/Matter.php");

// Requêtes SQL des listes déroulantes

class CategoryAdapter {

    private $list = [];
    private $complete = false;
    private $pdo;

    function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    function listAllCategories() {
        if (!$this->complete) {
            $sql = "SELECT cat_id AS id,"
                    . "cat_nom AS nom FROM categories "
                    . "ORDER BY cat_nom;";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $this->list = $stmt->fetchAll(PDO::FETCH_CLASS, "Category");
            $this->complete = true;
        }
        return $this->list;
    }

    function listFilteredCategories($cat, $crea, $mat) {
        if (!$this->complete) {
            $sql = "SELECT DISTINCT cat_id AS id,"
                    . "cat_nom AS nom FROM categories "
                    . "JOIN produits ON prod_fk_categorie = cat_id "
                    . "WHERE ";
            $execute = [];
            if ($cat !== "all") {
                $sql .= "cat_id = :cat AND ";
                $execute[':cat'] = $cat;
            };
            if ($crea !== "all") {
                $sql .= "prod_fk_createur = :crea AND ";
                $execute[':crea'] = $crea;
            };
            if ($mat !== "all") {
                $sql .= "prod_fk_matiere = :mat AND ";
                $execute[':mat'] = $mat;
            };
            $sql = substr($sql, 0, strlen($sql) - 4) . " ORDER BY cat_nom;";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($execute);
            $this->list = $stmt->fetchAll(PDO::FETCH_CLASS, "Category");
            $this->complete = true;
        }
        return $this->list;
    }
    function addCat($param){
         if (!$this->complete) {
            $sql = "INSERT INTO categories "
                    . "VALUES (default,:nom) ";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([":nom"=>$param]);
            $this->complete = true;
        }
    }

}

class CreatorAdapter {

    private $list = [];
    private $complete = false;
    private $pdo;

    function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }
function addCrea($crea){
     if (!$this->complete) {
            $sql = "INSERT INTO createurs "
                    . "VALUES (default,:nom) ";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([":nom"=>$crea]);
            $this->complete = true;
        }
}
    function listAllCreators() {
        if (!$this->complete) {
            $sql = "SELECT cre_id AS id,"
                    . "cre_nom AS nom FROM createurs "
                    . "ORDER BY cre_nom;";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $this->list = $stmt->fetchAll(PDO::FETCH_CLASS, "Creator");
            $this->complete = true;
        }
        return $this->list;
    }

    function listFilteredCreators($crea, $mat, $cat) {
        if (!$this->complete) {
            $sql = "SELECT DISTINCT cre_id AS id, "
                    . "cre_nom AS nom FROM createurs "
                    . "JOIN produits ON prod_fk_createur = cre_id "
                    . "WHERE ";
            $execute = [];
            if ($crea !== "all") {
                $sql .= "cre_id = :crea AND ";
                $execute[':crea'] = $crea;
            };
            if ($cat !== "all") {
                $sql .= "prod_fk_categorie = :cat AND ";
                $execute[':cat'] = $cat;
            };
            if ($mat !== "all") {
                $sql .= "prod_fk_matiere = :mat AND ";
                $execute[':mat'] = $mat;
            };
            $sql = substr($sql, 0, strlen($sql) - 4) . " ORDER BY cre_nom;";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($execute);
            $this->list = $stmt->fetchAll(PDO::FETCH_CLASS, "Creator");
            $this->complete = true;
        }
        return $this->list;
    }

}

class MatterAdapter {

    private $list = [];
    private $complete = false;
    private $pdo;

    function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }
function addMat($mat){
     if (!$this->complete) {
            $sql = "INSERT INTO matieres "
                    . "VALUES (default,:nom) ";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([":nom"=>$mat]);
            $this->complete = true;
        }
}
    function listAllMatters() {
        if (!$this->complete) {
            $sql = "SELECT mat_id AS id,"
                    . "mat_nom AS nom FROM matieres "
                    . "ORDER BY mat_nom;";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $this->list = $stmt->fetchAll(PDO::FETCH_CLASS, "Matter");
            $this->complete = true;
        }
        return $this->list;
    }

    function listFilteredMatters($mat, $crea, $cat) {
        if (!$this->complete) {
            $sql = "SELECT DISTINCT mat_id AS id, "
                    . "mat_nom AS nom FROM matieres "
                    . "JOIN produits ON prod_fk_matiere = mat_id "
                    . "WHERE ";
            $execute = [];
            if ($mat !== "all") {
                $sql .= "mat_id = :mat AND ";
                $execute[':mat'] = $mat;
            };
            if ($crea !== "all") {
                $sql .= "prod_fk_createur = :crea AND ";
                $execute[':crea'] = $crea;
            };
            if ($cat !== "all") {
                $sql .= "prod_fk_categorie = :cat AND ";
                $execute[':cat'] = $cat;
            };
            $sql = substr($sql, 0, strlen($sql) - 4) . " ORDER BY mat_nom;";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($execute);
            $this->list = $stmt->fetchAll(PDO::FETCH_CLASS, "Matter");
            $this->complete = true;
        }
        return $this->list;
    }

}

//test de réception des données

/*
$connexion=DBConnection::getInstance();
$createurAD = new CreatorAdapter($connexion);
$listeCreateur=$createurAD->listFilteredCreators("all", "1", "all");
var_dump($listeCreateur);
 * 
 */

 