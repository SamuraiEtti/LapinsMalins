<?php
header("Content-type:text/json;charset=utf8");
include_once('TshirtController.php');

$tshirt=new TshirtController();
$lenom=$tshirt->listeBarRecherche($_GET["nom"]);
echo json_encode($lenom);

?>
