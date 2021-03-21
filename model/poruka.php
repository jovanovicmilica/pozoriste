<?php

    require_once "konekcija.php";   

    $kod=200;
    $data="";
    
    if(isset($_POST['dugme'])){
        
        $ime=$_POST["ime"];
        $prezime=$_POST["prezime"];
        $telefon=$_POST["telefon"];
        $mail=$_POST["mail"];
        $poruka=$_POST["poruka"];



        $regImePrezime="/^[A-ZŠĐŽČĆ][a-zšđžčć]{2,19}$/";
        $regEmail="/^\w[.\d\w]*\@[a-z]{2,10}(\.[a-z]{2,3})+$/";
        $regTelefon="/^06\d{1}\/\d{7}$/";


        $greska=0;

        if(!preg_match($regImePrezime,$ime)){
            $greska++;
            $data="Ime mora početi velikim slovom i ima najmanje 3, a najviše 20 slova";
        }
        if(!preg_match($regImePrezime,$prezime)){
            $greska++;
            $data="Prezime mora početi velikim slovom i ima najmanje 3, a najviše 20 slova";
        }
        if(!preg_match($regTelefon,$telefon)){
            $greska++;
            $data="Telefon mora biti u formatu 060/1234567";
        }
        if(!preg_match($regEmail,$mail)){
            $greska++;
            $data="E-mail format: jana.matovic.139.19@ict.edu.rs ili jana@yahoo.com";
        }
        if(count($poruka)<=9){
            $greska++;
            $data="Poruka mora imati najmanje 10 reči";
        }
        $poruka=implode($poruka," ");

        if($greska==0){
            $dodajPorukuUpit="INSERT INTO poruke VALUES (null,:ime,:prezime,:telefon,:email,:poruka)";
            $priprema=$konekcija->prepare($dodajPorukuUpit);
            $priprema->bindParam(":ime",$ime);
            $priprema->bindParam(":prezime",$prezime);
            $priprema->bindParam(":telefon",$telefon);
            $priprema->bindParam(":email",$mail);
            $priprema->bindParam(":poruka",$poruka);

            try{
                $priprema->execute();
                $data="Hvala što ste poslali poruku!";
            }
            catch(PDOException $e){
                $data="Greška sa serverom";
            }
        }
    }
    else{
        $data="Nemate pristup";
        $kod=404;
    }

    
echo json_encode($data);
http_response_code($kod);

?>