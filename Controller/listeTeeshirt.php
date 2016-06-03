<?php

require_once 'TShirtController.php';

header("Content-type:text/json;charset=utf8");

$crea = isset($_GET['crea']) ? $_GET["crea"] : "all";
$mat = isset($_GET['mat']) ? $_GET["mat"] : "all" ;
$cat = isset($_GET['cat']) ? $_GET["cat"] : "all" ;

$tee = new TShirtController();
if ($crea == 'all' && $mat == 'all' && $cat == 'all') {
    $liste = $tee->listall();
} else {
    $liste = $tee->filterTees($crea, $mat, $cat);
}
echo json_encode($liste);
