<?php

require_once __DIR__ . '/../Adapter/ListAdapter.php';
require_once __DIR__ . '/../Adapter/DBConnection.php';

// toutes les fonctions sur les listes déroulantes
class ListController {

    function listCrea($crea, $mat, $cat) {
        $connect = DBConnection::getInstance();
        $listAd = new CreatorAdapter($connect);
        if ($crea == $mat && $mat == $cat && $cat == "all") {
            $listCrea = $listAd->listAllCreators();
        } else {
            $listCrea = $listeAd->listFilteredCreators($crea, $mat, $cat);
        }
        return $listCrea;
    }

    function listCat($cat, $crea, $mat) {
        $connect = DBConnection::getInstance();
        $listAd = new CategoryAdapter($connect);
        if ($cat == $crea && $crea == $mat && $mat == "all") {
            $listCat = $listAd->listAllCategories();
        } else {
            $listCat = $listAd->listFilteredCategories($cat, $crea, $mat);
        }
        return $listCat;
    }

    function listMat($mat, $crea, $cat) {
        $connect = DBConnection::getInstance();
        $listAd = new MatterAdapter($connect);
        if ($mat == $crea && $crea == $cat && $cat == "all") {
            $listMat = $listAd->listAllMatters();
        } else {
            $listMat = $listAd->listFilteredMatters($mat, $crea, $cat);
        }
        return $listMat;
    }

}
