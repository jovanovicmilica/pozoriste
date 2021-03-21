<?php

require_once "konekcija.php";

        $pitanjeUpit="SELECT * FROM anketa";

        $upit="SELECT *,ROUND(COUNT(o.idOdgovor)/(SELECT COUNT(idOdgovor) AS ukupno FROM odgovoranketa)*100) AS broj FROM odgovoranketa oa INNER JOIN odgovori o ON oa.idOdgovor=o.idOdgovor GROUP BY o.idOdgovor";
        $code=200;
    
        try{
            $pitanje=$konekcija->query($pitanjeUpit)->fetch();
            $data['pitanje']=$pitanje['pitanje'];
            $data['aktivna']=$pitanje['aktivna'];
            $data['odgovori']=$konekcija->query($upit)->fetchAll();
        }
        catch(PDOException $e){
            $code=500;
            $data="Greška sa serverom";
        }

    

    
echo json_encode($data);
http_response_code($code);

?>