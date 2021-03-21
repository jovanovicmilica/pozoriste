<?php

require_once "konekcija.php";

    $upit="SELECT * FROM korisnik";
    $code=200;

    try{
        $data=$konekcija->query($upit)->fetchAll();
    }
    catch(PDOException $e){
        $code=500;
        $data="Greška sa serverom";
    }

    
echo json_encode($data);
http_response_code($code);

?>