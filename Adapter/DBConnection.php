<?php

class DBConnection {

    private static $instance = null;
    private $pdo;

    private function __construct() {
        $user = "root";
        $password = "mysql";
        $server = "mysql:host=localhost;dbname=tshirt";
        $this->pdo = new PDO($server, $user, $password);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $request = "SET NAMES utf8";
        $result = $this->pdo->exec($request);
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new DBConnection();
        }
        return self::$instance->pdo;
    }

}
