<?php

// Ajouter un écouteur sur le filtre créateur/matière/catégorie
// Appeler le TShirtController pour lister les Tshirts filtrés
// Ajouter un écouteur sur l'input search
// Appeler le TshirtController pour trier sur le nom
// Ajouter un écouteur sur chaque filtre (onChange)
// Appeler les fonctions en lien dans le ListController
// Ajouter un écouteur sur les Tshirts listés
// Faire un load de l'HTML selon qu'on veut modifier, voir ou supprimer
// et des fonctions en lien dans le TShirtController

$page = (isset($_GET['page'])) ? $_GET['page'] : "index";

switch($page) {
    case "index":
        include_once 'Template/accueil.html';
        break;
    case "log":
        
        break;
}
