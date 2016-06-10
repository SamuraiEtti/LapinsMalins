<?php

require_once __DIR__ . '/../Classes/TShirt.php';
require_once __DIR__ . '/../Classes/ModelSize.php';

// Ici se trouvent toutes les requêtes SQL

class TShirtAdapter {

    private $list = [];
    private $complete = false;
    private $pdo;

    function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    function listAllTshirt() {
        // Tous les tshirts, par défaut
        if (!$this->complete) {
            $sql = "SELECT prod_id AS id, "
                    . "prod_nom AS nom, "
                    . "prod_prix AS prix, "
                    . "prod_img_gd AS imgDetails, "
                    . "prod_img_pt AS imgListe, "
                    . "prod_desc AS description, "
                    . "cre_nom AS createur, "
                    . "mat_nom AS matiere, "
                    . "prod_date AS date, "
                    . "cat_nom AS categorie "
                    . "FROM produits "
                    . "JOIN createurs ON prod_fk_createur = cre_id "
                    . "JOIN matieres ON prod_fk_matiere = mat_id "
                    . "JOIN categories ON prod_fk_categorie = cat_id;";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $this->list = $stmt->fetchAll(PDO::FETCH_CLASS, "TShirt");
            $this->complete = true;
        }
        return $this->list;
    }

    function searchTShirtByName($lettre) {
        // Recherche selon l'input search
        if (!$this->complete) {
            $sql = "SELECT prod_id AS id, "
                    . "prod_nom AS nom, "
                    . "prod_prix AS prix, "
                    . "prod_img_gd AS imgDetails, "
                    . "prod_img_pt AS imgListe, "
                    . "prod_desc AS description, "
                    . "cre_nom AS createur, "
                    . "mat_nom AS matiere, "
                    . "prod_date AS date, "
                    . "cat_nom AS categorie "
                    . "FROM produits "
                    . "JOIN createurs ON prod_fk_createur = cre_id "
                    . "JOIN matieres ON prod_fk_matiere = mat_id "
                    . "JOIN categories ON prod_fk_categorie = cat_id "
                    . "WHERE prod_nom LIKE :a "
                    . "order by prod_nom";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([":a" => "%" . $lettre . "%"]);
            $this->list = $stmt->fetchAll(PDO::FETCH_CLASS, "TShirt");
            $this->complete = true;
        }
        return $this->list;
    }

    // 3 fonctions l'une à la suite de l'autre, mais il faut
    // alors reprendre à partir du résultat précédent (comment faire ?)
    // ou une grosse requête qui se module selon ce qu'on lui donne ?

    function searchTShirtByCreator() {
        // Recherche selon créateur
    }

    function searchTShirtByMatter() {
        // Recherche selon matière
    }

    function searchTShirtByCategory() {
        // Recherche par catégorie
    }

    function searchTShirtByFilters($crea, $mat, $cat) {
        if (!$this->complete) {
            $sql = "SELECT prod_id AS id, "
                    . "prod_nom AS nom, "
                    . "prod_prix AS prix, "
                    . "prod_img_gd AS imgDetails, "
                    . "prod_img_pt AS imgListe, "
                    . "prod_desc AS description, "
                    . "cre_nom AS createur, "
                    . "mat_nom AS matiere, "
                    . "prod_date AS date, "
                    . "cat_nom AS categorie "
                    . "FROM produits "
                    . "JOIN createurs ON prod_fk_createur = cre_id "
                    . "JOIN matieres ON prod_fk_matiere = mat_id "
                    . "JOIN categories ON prod_fk_categorie = cat_id "
                    . "WHERE ";
            $execute = [];
            if ($mat !== "all") {
                $sql .= "mat_id = :mat AND ";
                $execute[':mat'] = $mat;
            };
            if ($crea !== "all") {
                $sql .= "cre_id = :crea AND ";
                $execute[':crea'] = $crea;
            };
            if ($cat !== "all") {
                $sql .= "cat_id = :cat AND ";
                $execute[':cat'] = $cat;
            };
            $sql = substr($sql, 0, strlen($sql) - 4) . " ORDER BY prod_nom;";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($execute);
            $this->list = $stmt->fetchAll(PDO::FETCH_CLASS, "TShirt");
            $this->complete = true;
        }
        return $this->list;
    }

    function searchTshirtById($id) {
        if (!$this->complete) {
            $sql = "SELECT prod_id AS id, "
                    . "prod_nom AS nom, "
                    . "prod_prix AS prix, "
                    . "prod_img_gd AS imgDetails, "
                    . "prod_img_pt AS imgListe, "
                    . "prod_desc AS description, "
                    . "cre_nom AS createur, "
                    . "mat_nom AS matiere, "
                    . "prod_date AS date, "
                    . "cat_nom AS categorie,"
                    . "(SELECT exem_stock FROM exemplaires "
                    . "WHERE exem_fk_tee = :a AND exem_fk_tail = 1) AS small, "
                    . "(SELECT exem_stock FROM exemplaires "
                    . "WHERE exem_fk_tee = :a AND exem_fk_tail = 2) AS medium, "
                    . "(SELECT exem_stock FROM exemplaires "
                    . "WHERE exem_fk_tee = :a AND exem_fk_tail = 3) AS large, "
                    . "(SELECT exem_stock FROM exemplaires "
                    . "WHERE exem_fk_tee = :a AND exem_fk_tail = 4) AS xlarge "
                    . "FROM produits "
                    . "JOIN createurs ON prod_fk_createur = cre_id "
                    . "JOIN matieres ON prod_fk_matiere = mat_id "
                    . "JOIN categories ON prod_fk_categorie = cat_id "
                    . "WHERE prod_id = :a ";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([":a" => $id]);
            $this->list = $stmt->fetchAll(PDO::FETCH_CLASS, "TShirt");
            $this->complete = true;
        }
        return $this->list;
    }

    function insertTshirt(TShirt $tee) {
        if (!$this->complete) {
            $sql = "INSERT INTO produits VALUES ("
                    . "default, "
                    . ":nom, "
                    . ":prix, "
                    . ":imgGd, "
                    . ":imgPt, "
                    . ":description, "
                    . ":createur, "
                    . ":matiere, "
                    . ":date, "
                    . ":categorie);";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
            ':nom' => $tee->getNom(),
            ':prix' => $tee->getPrix(),
            ':imgGd' => $tee->getImgDetails(),
            ':imgPt' => $tee->getImgListe(),
            ':description' => $tee->getDescription(),
            ':createur' => $tee->getCreateur(),
            ':matiere' => $tee->getMatiere(),
            ':date' => $tee->getDate(),
            ':categorie' => $tee->getCategorie()
            ]);
            $this->complete = true;
        }
    }
    function supprimerTshirtById($id){
       echo"on va supprimer!";
    }

}
