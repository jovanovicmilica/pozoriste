<?php

    require_once "konekcija.php";   

    $kod=200;
    $data="";
    $upit="SELECT * FROM cena c INNER JOIN predstava p on c.idPredstava=p.idPredstava";

    try{
        $data=$konekcija->query($upit)->fetchAll();
    }
    catch(PDOException $e){
        $data="Greška sa serverom";
        $kod=500;
    }

    
echo json_encode($data);
http_response_code($kod);

?>