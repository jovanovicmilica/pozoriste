<?php
    require_once "konekcija.php";

    $upit="SELECT * FROM anketa WHERE aktivna=1";

    
    $idOdg=0;

    try{  
        $rez=$konekcija->query($upit);
        $anketa=$rez->fetch();
        if($anketa){
            $code=200;
            $idAnkete=$anketa['idAnketa'];
            $odgovori="SELECT * FROM odgovori WHERE idAnkete=:id";
            $priprema=$konekcija->prepare($odgovori);
            $priprema->bindParam(":id",$idAnkete);
            try{
                $priprema->execute();
                $odg=$priprema->fetchAll();
                if(isset($_SESSION['user'])){
                    $korisnik=$_SESSION['user'];
                    $idKorisnika=$korisnik['idKorisnik'];
                    $odgovor="SELECT * FROM odgovoranketa oa INNER JOIN odgovori o ON oa.idOdgovor=o.idOdgovor WHERE oa.idKorisnik=:id AND o.idAnkete=:idAnketa";
                    $priprema2=$konekcija->prepare($odgovor);
                    $priprema2->bindParam(":id",$idKorisnika);
                    $priprema2->bindParam(":idAnketa",$idAnkete);
                    try{
                        $priprema2->execute();
                        if($priprema2->rowCount()==1){
                            $red=$priprema2->fetch();
                            $idOdg=$red['idOdgovor'];
                        }
                    }
                    catch(PDOException $e){
                        echo "Greška sa serverom";
                    }
                }
    
            }
            catch(PDOException $e){
                echo "Greška sa serverom";
            }
        }
        
    }
    catch(PDOException $e){
        $code=500;
        echo "Greška sa serverom";
    }
    


?>