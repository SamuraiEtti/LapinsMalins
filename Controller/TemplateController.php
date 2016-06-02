<?php

require_once 'Controller/TShirtController.php';
require_once 'Adapter/DBConnection.php';

function listeDesTees() {
    $tee = new TShirtController();
    $liste = $tee->listall();
    
    echo "<ul>";
    foreach ($liste as $tee) {
        echo "<li>" . $tee->getNom() . "</li>";
    };
    echo "</ul>";
}
