<?php

require_once "konekcija.php";

    if(isset($_POST['dugme'])){
        $poruka="";
        $code=200;

        if(isset($_FILES['slika'])){
            $slika=$_FILES['slika'];
            $tmpName=$slika['tmp_name'];
            $size=$slika['size'];
            $tip=$slika['type'];
            $name=$slika['name'];
            $naziv=time().$name;
            $putanja="../assets/images/$naziv";
            $rezultat=move_uploaded_file($tmpName,$putanja);
            if(!$rezultat){
                $poruka="Došlo je do greške";
                $kod=200;
            }
        }



    
        $naslov= $_POST['naslov'];
        $id= $_POST['id'];
        $cena= $_POST['cena'];
        $tekst= $_POST['sadrzaj'];
        $datum=$_POST['premijera'];

        $greske=0;

        $regNaslov="/^[A-Z][a-z]{2,}(\s[A-Za-z]+)*$/";
        $regCena="/^\d+$/";
        $regTekst=explode(" ",$tekst);

        if(!preg_match($regNaslov,$naslov)){
            $poruka="Naslov mora početi velikim slovom i ima najmanje 3 slova";
            $greske++;
        }
        if($datum==""){
            $poruka="Morate izabrati datum premijere";
            $greske++;
        }
        if(count($regTekst)<50){
            $poruka="Tekst mora imati bar 50 reči";
            $greske++;
        }
        if(!preg_match($regCena,$cena)){
            $poruka="Cena mora biti broj";
            $greske++;
        }

        if($greske==0){

            
            if(isset($_FILES['slika'])){
                //updateSlike
                $upit="UPDATE predstava SET slikasrc=:slikasrc,naziv=:naziv,premijera=:premijera,sadrzaj=:sadrzaj WHERE idPredstava=:id";
                $priprema=$konekcija->prepare($upit);
                $priprema->bindParam(":slikasrc",$naziv);
                $priprema->bindParam("naziv",$naslov);
                $priprema->bindParam("premijera",$datum);
                $priprema->bindParam("sadrzaj",$tekst);
                $priprema->bindParam(":id",$id);
                
            }
            else{
                //update ostatak
                $upit="UPDATE predstava SET naziv=:naziv,premijera=:premijera,sadrzaj=:sadrzaj WHERE idPredstava=:id";
                $priprema=$konekcija->prepare($upit);
                $priprema->bindParam("naziv",$naslov);
                $priprema->bindParam("premijera",$datum);
                $priprema->bindParam("sadrzaj",$tekst);
                $priprema->bindParam(":id",$id);
            }

            try{
                $priprema->execute();
                $updateCena="UPDATE cena SET cena=:cena WHERE idPredstava=:id";
                $priprema2=$konekcija->prepare($updateCena);
                $priprema2->bindParam(":cena",$cena);
                $priprema2->bindParam(":id",$id);
                try{
                    $priprema2->execute();
                    $poruka="Uspešno ste izmenili predstavu";
                }
                catch(PDOException $e){
                    $poruka="Greška sa serverom";
                    $kod=500;
                }
            }
            catch(PDOException $e){
                $poruka="Greška sa serverom";
                $kod=500;
            }
            
        }


    }
    else{
        $kod=404;
        $poruka="Nemate pristup.";
    }



    
    echo json_encode($poruka);
    http_response_code($code);
?>  