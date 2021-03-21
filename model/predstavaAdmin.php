<?php

    require_once "konekcija.php";  
    $code=200;
    $data="";
    
    if(isset($_GET['dugme'])){
            $id=$_GET['id'];
            $upit="SELECT * FROM predstava p INNER JOIN cena c ON p.idPredstava=c.idPredstava WHERE p.idPredstava=:id";
            $pripremaUpit=$konekcija->prepare($upit);
            $pripremaUpit->bindParam(":id",$id);
            try{
                $pripremaUpit->execute();
                $data=$pripremaUpit->fetch();
            }
            catch(PDOException $e){
                $data= "Greška sa serverom";
                $code=500;
            }
    }
    else{
        $code=404;
        $data="Nemate pristup";
    }

    echo json_encode($data);
    http_response_code($code);
?>