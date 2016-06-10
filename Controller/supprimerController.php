<?php
header("Content-type:text/json;charset=utf8");
include_once('../Adapter/TShirtAdapter.php');
include_once('../Adapter/DBConnection.php');
$id=$_GET["id_tshirt"];
$connect=DBConnection::getInstance();
$tshirtAdapt=new TShirtAdapter($connect);
$id=$_GET["id_tshirt"];
$liste=$tshirtAdapt->supprimerTshirtById($id);
echo json_encode($liste);
?>