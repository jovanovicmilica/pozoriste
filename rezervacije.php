<?php


    require_once "view/fixed/head.php";

    require_once "view/fixed/header.php";

    if(isset($_SESSION['user'])){
        require_once "view/pages/rezervacije.php";
    }
    else{
        include "greska.php";
    }

    require_once "view/fixed/footer.php";

?>