<?php

    require_once "konekcija.php";

    $data="";
    $code=200;
    if(isset($_POST['dugme'])){
        $id=$_POST['idPredstava'];
        $datum=$_POST['datum'];

        if(strtotime($datum)<time()){
            $data="Ne možete izabrati datum u prošlosti ni današnji datum";
        }
        else{
            //$data="OK";
            $slobodanDatum="SELECT * FROM repertoar WHERE datum=:datum";
            $priprema=$konekcija->prepare($slobodanDatum);
            $priprema->bindParam(":datum",$datum);
            try{
                $priprema->execute();
                if($priprema->rowCount()==0){
                    $insertUpit="UPDATE repertoar SET datum=:datum WHERE idRepertoar=:id";
                    $priprema2=$konekcija->prepare($insertUpit);
                    $priprema2->bindParam(":id",$id);
                    $priprema2->bindParam(":datum",$datum);
                    try{
                        $priprema2->execute();
                        $data="Uspešno ste ažurirali datum";
                    }
                    catch(PDOException $e){
                        $code=500;
                        $data="Greška sa serverom";
                    }
                }
                else{
                    $data="Izabrani datum je zauzet";
                }
            }
            catch(PDOException $e){
                $code=500;
                $data="Greška sa serverom";
            }
        }
    }
    else{
        $code=404;
        $data="Nemate pristup";
    }

    
echo json_encode($data);
http_response_code($code);

?>