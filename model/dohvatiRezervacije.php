<?php
session_start();
    require_once "konekcija.php";
    

    
    $korisnik=$_SESSION['user'];
    $idKorisnika=$korisnik['idKorisnik'];
    $code=200;

    $upit="SELECT r.idRezervacija,p.naziv,re.datum,c.cena*(SUM(r.brojKarata)) AS ukupno,SUM(r.brojKarata) AS broj FROM rezervacija r INNER JOIN repertoar re ON r.idRepertoar=re.idRepertoar INNER JOIN cena c on re.idCena=c.idCena INNER JOIN predstava p on c.idPredstava=p.idPredstava WHERE r.idKorisnik=:id AND re.datum>=CURRENT_DATE GROUP BY r.idRezervacija ORDER BY re.datum";

    $priprema=$konekcija->prepare($upit);
    $priprema->bindParam(":id",$idKorisnika);

    try{
        $priprema->execute();
        if($priprema->rowCount()!=0){
            $rezervacije=$priprema->fetchAll();
        }
        else{
            $rezervacije="nema";
        }
    }
    catch(PDOException $e){
        $rezervacije="Grška sa serverom";
        $code=500;
    }


    
echo json_encode($rezervacije);
http_response_code($code);
?>