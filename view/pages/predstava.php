<?php

    require_once "model/predstava.php";

?>

<main>
    <div id="jednaPredstava">
        <?php
            if(isset($poruka)):
        ?>
            <div class="naslov">
                <h1><?=$poruka?></h1>
            </div>
        <?php
            else:
        ?>
            <div id="predstave" class="jedna">
                <div id="predstavaTekst">
                    <h1><?=$predstava['naziv']?></h1>
                    <p><?=$predstava['sadrzaj']?></p>
                    <p>Premijera: <?=explode("-",$predstava['premijera'])[2].".".explode("-",$predstava['premijera'])[1].".".explode("-",$predstava['premijera'])[0]."."?></p>
                </div>
                <div>
                    <img src="assets/images/<?=$predstava['slikasrc']?>" alt="">
                </div>
            </div>
        <?php
            endif;
        ?>
    </div>
</main>