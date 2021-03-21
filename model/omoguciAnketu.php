<?php
    require_once "konekcija.php";


    $code=200;
    $poruka="";
        $upit="UPDATE anketa set aktivna=1";
        
        try{
            $konekcija->query($upit);
            $poruka="ok";

        }
        catch(PDOException $e){
            $code=500;
            $poruka="Greška sa serverom";
        }


    
    
echo json_encode($poruka);
http_response_code($code);
?>