<?php
    require_once "konekcija.php";


    $code=200;
    $poruka="";
    if(isset($_POST['dugme'])){
        $idRez=$_POST['id'];
        $upit="DELETE FROM poruke WHERE idPoruke=:id";
        $priprema=$konekcija->prepare($upit);
        $priprema->bindParam(":id",$idRez);
        try{
            $priprema->execute();
            $poruka="ok";

        }
        catch(PDOException $e){
            $code=500;
            $poruka="Greška sa serverom";
        }
    }
    else{
        $code=404;
        $poruka="Nemate pristup";
    }


    
    
echo json_encode($poruka);
http_response_code($code);
?>