<?php
require_once __DIR__."/DBConnection.php";
$connect=DBConnection::getInstance();
if (isset($_GET['login'])&&isset($_GET['mdp'])){
    $login=$_GET['login'];
$mdp=$_GET['mdp'];
    $resultat=regarde($connect,$login,$mdp);
    $tab=["autorisation"=>"ko"];
    if($resultat){
        $tab=["autorisation"=>"ok"];
    }
    echo json_encode($tab);
}

function regarde($connect,$login,$mdp){
    $sql="select login from users where login=:a && mdp=:b";
    $stmt=$connect->prepare($sql);
      $stmt->execute([':a'=>$login,':b'=>md5($mdp)]);
           $stmt=$stmt->fetchColumn();
    
          if ($stmt!==false){
              //echo ('{"autorisation":"ok"}');
              session_start();
          return true;
      }else{
      //echo ('{autorisation":"ko"}');
          return false;
      }
}



?>