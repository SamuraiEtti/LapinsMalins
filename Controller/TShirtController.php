<?php

require_once __DIR__ . '/../Adapter/TShirtAdapter.php';
require_once __DIR__ . '/../Adapter/DBConnection.php';

class TShirtController {
    function listall() {
        $connect = DBConnection::getInstance();
        $teeAd = new TShirtAdapter($connect);
        $allTees = $teeAd->listAllTshirt();
        return $allTees;
    }
}