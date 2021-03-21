<?php
session_start();
    require_once "konekcija.php";

    $data="";
    if(isset($_POST['dugme'])){
        if(isset($_SESSION['user'])){
            $odgovor=$_POST['odg'];
            $korisnik=$_SESSION['user'];
            $idKorisnik=$korisnik['idKorisnik'];

            $upit="INSERT INTO odgovoranketa VALUES (NULL,:odg,:idKorisnik)";
            $priprema=$konekcija->prepare($upit);
            $priprema->bindParam(":odg",$odgovor);
            $priprema->bindParam(":idKorisnik",$idKorisnik);
            try{
                $priprema->execute();
                $code=201;
                $data="Hvala na odgovoru!";
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