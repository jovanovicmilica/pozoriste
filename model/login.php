<?php

session_start();
    require_once "konekcija.php";

    $data="";
    $code=200;
    if(isset($_POST['dugme'])){

        $korIme=$_POST['korIme'];
        $pass=$_POST['lozinka'];
        
    
        $regKorIme="/^.{5,15}$/";
        $regLozinka="/^.{8,15}$/";

        $greske=[];

        if(!preg_match($regKorIme,$korIme)){
            array_push($greske,"Korisničko ime mora imati najmanje 5, a najviše 15 karaktera");
        }
        if(!preg_match($regLozinka,$pass)){
            array_push($greske,"Lozina mora imati najmanje 8, a najviše 15 karaktera");
        }

        if(count($greske)==0){
            $aktivan=1;
            $daLiPostojiKorisnik="SELECT * FROM korisnik k WHERE korisnickoime=:korisnik AND aktivan=:aktivan";
            $priprema=$konekcija->prepare($daLiPostojiKorisnik);
            $priprema->bindParam(":korisnik",$korIme);
            $priprema->bindParam(":aktivan",$aktivan);
            try{
                $priprema->execute();
                if($priprema->rowCount()==1){
                    $upit="SELECT * FROM korisnik k INNER JOIN uloga u ON k.idUloga=u.idUloga WHERE korisnickoime=:korisnik AND lozinka=:pass";
                    $pass=md5($pass);
                    $priprema2=$konekcija->prepare($upit);
                    $priprema2->bindParam(":korisnik",$korIme);
                    $priprema2->bindParam(":pass",$pass);
                    try{
                        $priprema2->execute();
                        $code=200;
                        if($priprema2->rowCount()==1){
                            $korisnik=$priprema2->fetch();
                            $_SESSION['user']=$korisnik;
                            $code=201;
                            $data="ok";
                        }
                        else{
                            $data="Lozinka nije ispravna";
                        }
                    }
                    catch(PDOException $e){
                        $code=500;
                        $data="Greška sa serverom";
                    }
                    $code=200;
                }
                else{
                    $code=200;
                    $data="Korisnik sa tim korisničkim imenom nije pronadjen ili niste aktivirali nalog";
                }
            }
            catch(PDOException $e){
                $code=500;
                $data="Greška sa serverom";
            }
        }
        else{
            $data=$greske;
            $code=404;
        }

    }
    else{
        $data="Nemate pristup";
        $code=404;
    }


    
echo json_encode($data);
http_response_code($code);

?>