<header>
    <div id="logo">
        <a href="index.php"><i class="fas fa-theater-masks"></i></a>
    </div>
    <nav> 
    </nav>
</header>
<div id="ikonice">
    <?php
        if(!isset($_SESSION['user'])):
    ?>
        <a href="#" id="login"><i class="fas fa-user"></i></a>
    <?php
        else:
    ?>
    <a href="#" id="logOut"><i class="fas fa-sign-out-alt"></i></a>
    <?php
        endif;
    ?>
    <br>
    <a href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a>
    <br>
    <a href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook-f"></i></a>
    <br>
    <a href="https://www.youtube.com/" target="_blank"><i class="fab fa-youtube"></i></a>
    <br>
    <a href="https://www.twitter.com/" target="_blank"><i class="fab fa-twitter"></i></a>
</div>
<div class="forma" id="logovanje">
    <form action="">
        <a href="#" id="closeLogIn"><i class="fas fa-times"></i></a>
        <h2>Uloguj se</h2>
        <input type="text" name="" id="korIme" placeholder="Korisničko ime">
        <p id="porukaKorIme"></p>
        <input type="password" name="" id="lozinka" placeholder="Lozinka">
        <p id="porukaLozinka"></p>
        <input type="button" value="Uloguj se" id="btnLogIn">
        <p id="porukaLogovanje"></p>
        <a href="#" id="linkRegistracija">Registracija</a>
    </form>
</div>
<div class="forma" id="registracija">
    <form action="">
        <a href="#" id="closeReg"><i class="fas fa-times"></i></a>
        <h2>Registruj se</h2>
        <input type="text" id="imeReg" placeholder="Ime">
        <input type="text" id="prezimeReg" placeholder="Prezime">
        <p id="greskaImePrezime"></p>
        <input type="text" id="emailReg" placeholder="E-mail">
        <p id="greskaEmail"></p>
        <input type="text" id="korImeReg" placeholder="Korisničko ime">
        <p id="greskaKorIme"></p>
        <input type="text" id="telefonReg" placeholder="Telefon">
        <p id="greskaTelefon"></p>
        <input type="password" id="lozinkaReg" placeholder="Lozinka">
        <p id="greskaLozinka"></p>
        <input type="button" value="Registruj se" id="btnReg">
        <p id="porukaReg"></p>
    </form>
</div>