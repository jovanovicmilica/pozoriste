<?php

    require_once "view/fixed/head.php";

    if(isset(($_SESSION['user']))){
        $user=$_SESSION['user'];
        if($user['nazivUloge']=="Admin"){
            require_once "view/pages/admin.php";
        }
        else{
            include "greska.php";
        }
    }
    else{
        include "greska.php";
    }
    
?>