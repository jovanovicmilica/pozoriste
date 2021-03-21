<?php

    require_once "model/repertoar.php";

?>

<main>
    <div id="rezervacija">
        <form action="">
    <a href="#" id="close"><i class="fas fa-times"></i></a>
        <h2 id="naslov">Naslov</h2>
        Broj karata: <select id="brojKarata">
        </select>
        <p>Cena: <span id="cena"></span> din</p>
        <p>Ukupno: <span id="ukupno"> </span> din</p>
        <input type="hidden" id="idPredstave">
        <input type="button" value="Rezerviši" id="btnRezervisi">
        <p id="poruka"></p>
        </form>
    </div>
    <div class="naslov">
        <h1>Repertoar</h1>
    </div>
    <div id="search">
        <form action="<?=$_SERVER['PHP_SELF']?>" method="GET">
            <input type="text" name="pretraga" value="<?php
                if(isset($_GET['pretraga'])){
                    echo $_GET['pretraga'];
                }
                else{
                    echo "";
                }
            ?>" placeholder="Pretraži">
            <input type="hidden" name="strana" value="1">
        </form>
    </div>
    <?php
        if(isset($greska)):

    ?>
    <div class="naslov">
        <h2><?=$greska?></h2>
    </div>
    <?php   
        else:
    ?>
        <div id="repertoar">
    <?php
        foreach($repertoar as $r):
    ?>
        <div class="repertoar">
            <span class="datum"><?=explode("-",$r['datum'])[2].".".explode("-",$r['datum'])[1].".".explode("-",$r['datum'])[0]."."?></span>
            <a href="predstava.php?id=<?=$r['idPredstava']?>"><h2><?=$r['naziv']?></h2></a>
            <a href="#" class="rezervacije" data-id="<?=$r['idRepertoar']?>">Rezerviši</a>

        </div>
    <?php 
        endforeach;  
    ?>
        </div>
    <?php
        endif;
        
    ?>

    <div id="stranicenje">
        <?php
            $trenutna=(isset($_GET['strana'])? $_GET['strana'] : 1);
            $prethodna=$trenutna-1;
            $sledeca=$trenutna+1;
            $linkPrethodna=$_SERVER['PHP_SELF']."?";
            if($trenutna!=1):
                if(isset($_GET['pretraga'])){
                    $linkPrethodna.="pretraga=".$_GET['pretraga'];  
                }
                if(isset($_GET['strana'])){
                    $linkPrethodna.="&strana=".$prethodna;
                }
            
        ?>

             <a href="<?=$linkPrethodna?>">Prethodna</a>       

    <?php
            endif;
        
        for($i=1;$i<=$brojStrana;$i++):
    ?>
        <a href="<?php
        
        $link=$_SERVER['PHP_SELF']."?strana=".$i?>

        <?php
            if(isset($_GET['pretraga'])){
                $link.="&pretraga=".$_GET['pretraga'];
            }
            echo $link;
        ?>
        
        "
        <?php
            if($trenutna==$i):
        ?>
            class="aktivanLink"
        <?php
            endif;
        ?>
        ><?=$i?></a>
    <?php
        endfor;
        if($trenutna!=$brojStrana):
            $linkSledeca=$_SERVER['PHP_SELF']."?";
            if(!isset($_GET['strana'])){
                $linkSledeca.="strana="."2";
            }
            if(isset($_GET['strana'])){
                $linkSledeca.="strana=".$sledeca;
            }
            if(isset($_GET['pretraga'])){
                $linkSledeca.="&pretraga=".$_GET['pretraga'];
            }
    ?>
        <a href="<?=$linkSledeca?>">Sledeća</a>
    <?php
        endif;
    ?>

    </div>

    

</main>