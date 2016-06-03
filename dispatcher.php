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

$page = (isset($_GET['page'])) ? $_GET['page'] : "index";//par defaut il va en index

switch($page) {
    case "index":
        include_once 'Template/accueil.html';
        //faire l'include sur la page de log
        //si on veut que par éfaut ce soit log, on change dans la condition tertiaire la page en "log"
        //si session existe et si un si un element genre éconnecté" existe
        // => s'il est true, on va sur index s'il ets fals,e on va sur log
        break;
    case "log":
        //include log, peut être u check et ecrire des trucs dans la session
        break;
}
/*
pour le login: on peut soit écrire user et login en dur ou faire une connexion avec une base de onnées et créer un nouvel adapter pour y faire les requêtes
dans "logadapter.php": pas besoin de classe, juste faire une requete et veriffier si duo mdp et user est bon, il renvoie un résultat ou n'en renvoie pas (true ou false)
si true => connecté passe à vrai
*/