<?php

    require_once "konekcija.php";   

    if(isset($_GET['kod'])){
        $kod=$_GET['kod'];
    
        $upit="SELECT * FROM korisnik WHERE kod=:kod";
    
        $priprema=$konekcija->prepare($upit);
        $priprema->bindParam(":kod",$kod);
        try{
            $priprema->execute();
            if($priprema->rowCount()==1){
                $korisnik=$priprema->fetch();
                $ime=$korisnik['ime'];
                $aktivan=1;
                $upit2="UPDATE korisnik SET aktivan=:akt WHERE kod=:kod";
                $priprema2=$konekcija->prepare($upit2);
                $priprema2->bindParam(":akt",$aktivan);
                $priprema2->bindParam(":kod",$kod);
                try{
                    $priprema2->execute();
                    $poruka="Uspešno ste aktivirali nalog";
                }
                catch(PDOException $e){
                    $poruka="Greška sa serverom";;
                }
            }
            else{
                $poruka="Neispravan kod";
            }
        }
        catch(PDOException $e){
            $poruka="Greška sa serverom";
        }
    }
    else{
        $poruka="Nemate pristup stranici";
    }

?>