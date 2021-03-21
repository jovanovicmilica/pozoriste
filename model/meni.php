<?php
    session_start();
    require_once "konekcija.php";
    
    $meni="";
    $code=200;

    if(isset($_SESSION['user'])){
        $korisnik=$_SESSION['user'];
        //var_dump($korisnik);
        //admin
        if($korisnik['nazivUloge']=="Admin"){
            $prikaz=3;
        }
        else{
        //korisnik
            $prikaz=2;
        }
    }
    else{
        $prikaz=1;
    }


    $upit="SELECT * FROM meni WHERE prikaz=0";
    if($prikaz==3){
        $upit.=" OR prikaz=2 OR prikaz=1";
    }
    if($prikaz==2){
        $upit.=" OR prikaz=1";
    }
    try{
        $meni=$konekcija->query($upit)->fetchAll();
    }
    catch(PDOException $e){
        $meni="Greška sa serverom";
        $code=500;
    }


    
echo json_encode($meni);
http_response_code($code);
?>