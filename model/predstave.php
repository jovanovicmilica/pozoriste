<?php
    require_once "konekcija.php";
    
    $predstave="";
    $code=200;
    $upit="SELECT * FROM predstava p INNER JOIN cena c ON p.idPredstava=c.idPredstava";
    try{
        $predstave=$konekcija->query($upit)->fetchAll();
    }
    catch(PDOException $e){
        $predstave="Greška sa serverom";
        $code=500;
    }


    
echo json_encode($predstave);
http_response_code($code);
?>