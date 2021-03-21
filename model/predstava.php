<?php

    require_once "konekcija.php";   
    if(isset($_GET['id'])){
        $id=$_GET['id'];
        $upit="SELECT * FROM predstava WHERE idPredstava=:id";
        $pripremaUpit=$konekcija->prepare($upit);
        $pripremaUpit->bindParam(":id",$id);
        try{
            $pripremaUpit->execute();
            if($pripremaUpit->rowCount()==1){
                $predstava=$pripremaUpit->fetch();
            }
            else{
                $poruka="Izabrana predstava ne postoji";
            }
        }
        catch(PDOException $e){
            $poruka= "Greška sa serverom";
        }
        
    }
    else{
        $poruka= "Nemate pristup stranici";
    }

?>