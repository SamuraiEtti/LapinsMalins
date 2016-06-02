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

    function searchTShirtByName() {
        // Recherche selon l'input search
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

}
