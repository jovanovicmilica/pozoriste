<?php
    require_once "konekcija.php";   


    $data="";
    $kod=200;
    if(isset($_POST['dugme'])){
        $id=$_POST['id'];
        $upit="DELETE FROM predstava WHERE idPredstava=:id";
        $priprema=$konekcija->prepare($upit);
        $priprema->bindParam(":id",$id);
        try{
            $priprema->execute();
            $data="ok";
        }
        catch(PDOException $e){
            $code=500;
            $data="Greška sa serverom";
        }
    }
    else{
        $data="Nemate pristup";
        $code=404;
    }


    
    
echo json_encode($data);
http_response_code($kod);

?>