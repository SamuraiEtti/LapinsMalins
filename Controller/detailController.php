<?php
header("Content-type:text/json;charset=utf8");
include_once('../Adapter/TShirtAdapter.php');
include_once('../Adapter/DBConnection.php');
include_once('../Adapter/ModelAdapter.php');
$id=$_GET["id_tshirt"];
$connect=DBConnection::getInstance();
$exemplaireAdapter=new ModelAdapter($connect);
$suppression=$exemplaireAdapter->deleteTshirt($id);
$tshirtAdapt=new TShirtAdapter($connect);
$liste=$tshirtAdapt->searchTshirtById($id);
echo json_encode($liste);
?>