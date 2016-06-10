<?php

require_once __DIR__ . '/../Adapter/ModelAdapter.php';
require_once __DIR__ . '/../Adapter/DBConnection.php';

class ModelController {
    
    function createModel($modSize, $teeId, $stock) {
        $connect = DBConnection::getInstance();
        $modAd = new ModelAdapter($connect);
        $modAd->insertModel($modSize, $teeId, $stock);
    }
}