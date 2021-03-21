<?php

    require_once "model/anketa.php";

?>

<div id="slika"></div>
<main>
    <div id="sledece">
        
    </div>
    <div id="oNama">
        <div id="tekst">
            <div class="tekst">
                <img src="assets/images/slika.jpg" alt="Slika pozorista">
            </div>
            <div class="tekst">
                <h2>O nama</h2>
                <p>Pozorište je osnovano 23. decembra 1949. godine kao Humorističko pozorište i potom je nekoliko puta menjalo ime. U periodu od 1954. do 1959. godine  zove se Beogradska komedija, a spajanjem sa Beogradskim dramskim pozorištem u jesen 1959. godine postaje Savremeno pozorište sa dve scene- na Crvenom krstu i na Terazijama.  Sa novom sezonom 1975/76 ponovo postaje samostalno i to pod sadašnjim imenom. Zbog temeljne rekonstrukcije svoje matične zgrade, predstave su od 1991. godine pa do povratka u svoju zgradu, izvođene na sceni Teatar T u ustanovi kulture „Vuk“ u Bulevaru Kralja Aleksandra.</p>
                <p>Pozorište se sada nalazi na adresi Bulver vojvode Mišića 39A </p>
            </div>
        </div>
    </div>
    <div id="cenovnik">
        <h2>Cenovnik</h2>
        <table></table>
    </div>

    <?php
    if(isset($_SESSION['user'])):
        if($anketa):
            if(!isset($red)):
    ?>
    <div id="anketa" class="naslov">
        <div>
            <h2>Anketa</h2>
            <h3><?=$anketa['pitanje']?></h3>
            <form action="#">
                <?php
                    foreach($odg as $o):
                ?>
                    <input type="radio" name="odgovori" value="<?=$o['idOdgovor']?>"><?=$o['tekst']?>
                    <br>
                <?php
                    endforeach;
                ?>
                <input type="button" value="Glasaj" id="btnAnketa">
            </form>
            <p id="porukaAnketa"></p>
        </div>
        <div id="slikaAnketa">
            <img src="assets/images/logo.png" alt="Logo slika">
        </div>
    </div>
    <?php
            endif;
        endif;
    endif;
    ?>
</main>