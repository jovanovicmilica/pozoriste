$(document).ready(function(){

    var url=location.href;

    dohvatiMeni();

    if(url.indexOf("index.php")!=-1){
        sledeceNaRepertoaru()
        cenovnik()
        $("#btnAnketa").click(glasaj)
    }
    if(url.indexOf("predstave.php")!=-1){
        prikaziPredstave()
    }
    if(url.indexOf("repertoar.php")!=-1){
        $(".rezervacije").click(rezervacije)
        $("#btnRezervisi").click(rezervisi)
    }
    if(url.indexOf("rezervacije.php")!=-1){
        dohvatiRezervacije()
    }
    if(url.indexOf("kontakt.php")!=-1){
        $("#btnPoruka").click(posaljiPoruku)
    }
    if(url.indexOf("admin.php")!=-1){
        dohvatiSvePredstave()
        $("#adminNavigacija ul a").click(adminLinkovi)
    }

    

    $("#closeLogIn").click(skloniLoginFormu)
    $("#login").click(prikaziLoginFormu)
})



function dohvatiMeni(){
    $.ajax({
        url:"model/meni.php",
        method:"get",
        dataType:"json",
        success:function(meni){
            ispisMeni(meni)
        },
        error:function(xhr){
            $("nav").html(xhr.responseText)
        }
    })
}

function ispisMeni(meni){
    let ispis=''
    ispis+="<ul>"
    for (let m of meni) {
        ispis+=`<li>
            <a href="${m.link}" class="meni" data-name="${m.naziv}">${m.naziv}</a>
        </li>`
    }
    ispis+="</ul>"
    $("header nav").html(ispis)


}

function sledeceNaRepertoaru(){
    $.ajax({
        url:"model/sledece.php",
        method:"get",
        dataType:"json",
        success:function(sledece){
            sledeceIspis(sledece)
        },
        error:function(xhr){
            $("#sledece").html(xhr.responseText)
        }
    })
}
function sledeceIspis(sledece){
    var s="";
    s+=`
        <div class="sledece">
            <div>
                <p id="sledeceNaslov">Sledeće na repertoaru<p>
                <h2>${sledece.naziv}</h2>
                <p>${sledece.datum.split("-")[2]}.${sledece.datum.split("-")[1]}.${sledece.datum.split("-")[0]}.</p>
            </div>
            <div>
                <a href="predstava.php?id=${sledece.idPredstava}">Pogledaj</a></div>
            </div>

        </div>
        <div class="sledece">
            <img src="assets/images/${sledece.slikasrc}" alt="${sledece.naziv}"/>
        </div>
    `
    $("#sledece").html(s)
}

function prikaziPredstave(){
    $.ajax({
        url:"model/predstave.php",
        method:"get",
        dataType:"json",
        success:function(predstave){
            svePredstaveIspis(predstave)
        },
        error:function(xhr){
            $("#predstave").html(xhr.responseText)
        }
    })
}
function svePredstaveIspis(predstave){
    var ispis=""
    for(let p of predstave){
        ispis+=`
                <div class="predstava">
                <a href="predstava.php?id=${p.idPredstava}">
                    <img src="assets/images/${p.slikasrc}" alt="${p.naziv}"/>
                    <p>${p.naziv}</p>
                    </a>
                </div>
        
        `
    }
    $("#predstave").html(ispis)
}

function rezervacije(e){
    e.preventDefault()
    $("#logovanje").hide()
    $("#registracija").hide()
    $("#poruka").html("")
    $(".rezervacije").attr("disabled",true)
    var id=this.dataset.id
    $("#rezervacija").show()
    $.ajax({
        url:"model/rezervacijaPopuniFormu.php",
        method:"get",
        dataType:"json",
        data:{
            "id":id,
            "dugme":true
        },
        success:function(predstava){
            popuniFormu(predstava)
        },
        error:function(xhr){
           $("#rezervacija").html(xhr.responseText)
        }
    })

}

function popuniFormu(data){
    
    $("#naslov").html(data['naziv'])
    var karte=''
    for(let i=1;i<=10;i++){
        karte+=`<option value="${i}">${i}</opiton>`
    }
    $("#brojKarata").html(karte)
    $("#cena").html(data['cena'])
    $("#ukupno").html(data['cena'])
    $("#idPredstave").val(data['idRepertoar'])

    $("#brojKarata").change(promenaUkupno)

    $("#close").click(function(e){
        e.preventDefault()
        $("#rezervacija").hide()
    })
}

function promenaUkupno(){
    var cena=$("#cena").text()
    
    $("#ukupno").html(this.value*cena)
}



function rezervisi(){
    var id=$("#idPredstave").val()
    var br=$("#brojKarata").val()
    $.ajax({
        url:"model/rezervisi.php",
        method:"post",
        dataType:"json",
        data:{
            "id":id,
            "brojKarata":br,
            "dugme":true
        },
        success:function(predstave){
            $("#poruka").html(predstave)
        },
        error:function(xhr){
            $("#poruka").html(xhr.responseText)
        }
    })
}



function prikaziLoginFormu(e){
    e.preventDefault()
    $("#logovanje").show()
    $("#rezervacija").hide()
    $("#registracija").hide()

}


function skloniLoginFormu(e){
    e.preventDefault()
    $("#logovanje").hide()
}

$("#btnLogIn").click(function(e){
    e.preventDefault()
    var korIme=$("#korIme").val()
    var lozinka=$("#lozinka").val()

    
    var regKorIme=/^.{5,15}$/;
    var regLozinka=/^.{8,15}$/;

    greska=0

    if(!regKorIme.test(korIme)){
        $("#porukaKorIme").html("Korisničko ime mora imati najmanje 5, a najviše 15 karaktera")
        greska++
    }
    else{
        $("#porukaKorIme").html("")
    }
    if(!regLozinka.test(lozinka)){
        $("#porukaLozinka").html("Lozinka mora imati najmanje 8, a najviše 15 karaktera")
        greska++
    }
    else{
        $("#porukaLozinka").html("")
    }

    if(greska==0){
        $.ajax({
            url:"model/login.php",
            method:"post",
            dataType:"json",
            data:{
                "korIme":korIme,
                "lozinka":lozinka,
                "dugme":true
            },
            success:function(data){
                if(data=="ok"){
                    location.reload()
                }
                else{
                    $("#porukaLogovanje").html(data)
                }
            },
            error:function(xhr){
                $("#porukaLogovanje").html(xhr.responseText)
            }
        })
    }
})

$("#logOut").click(function(e){
    e.preventDefault()
        $.ajax({
            url:"model/logOut.php",
            method:"post",
            dataType:"json",
            success:function(data){
                location.reload()
            },
            error:function(xhr){
            }
        })
})

$("#linkRegistracija").click(function(e){
    e.preventDefault()
    $("#logovanje").hide()
    $("#registracija").show()
})

$("#closeReg").click(function(e){
    e.preventDefault()
    $("#registracija").hide()
})

function cenovnik(){
    $.ajax({
        url:"model/cenovnik.php",
        method:"get",
        dataType:"json",
        success:function(data){
            ispisCenovnik(data)
        },
        error:function(xhr){
            $("#cenovnik").html(xhr.responseText)
        }
    })
}


function ispisCenovnik(data){
    var ispis='<tr><th>Naziv predstave</th><th>Cena</th></tr>'
    for(let d of data){
        ispis+=`<tr><td>${d.naziv}</td><td>${d.cena} din</td></tr>`
    }
    $("#cenovnik table").html(ispis)

}


function dohvatiRezervacije(){
    $.ajax({
        url:"model/dohvatiRezervacije.php",
        method:"get",
        dataType:"json",
        success:function(data){
            ispisRezervacija(data)
        },
        error:function(xhr){
            $("#tabelaRezervacije").html(xhr.responseText)
        }
    })
}

function ispisRezervacija(data){
    var ispis="";
    if(data=="nema"){
        ispis+=`<h2>Niste rezervisali karte.</h2>`
    }
    else{ispis+=`<table><tr><th>Naziv</th><th>Datum</th><th>Broj karata</th><th>Cena</th><th>Otkaži rezervaciju</th></tr>`
    for(let d of data){
        ispis+=`<tr><td>${d.naziv}</td><td>${d.datum.split("-")[2]}.${d.datum.split("-")[1]}.${d.datum.split("-")[0]}.</td><td>${d.broj}</td><td>${d.ukupno} din</td><td><a href="#" class="otkaziRez" data-id="${d.idRezervacija}">Otkaži</a></td></tr>`

    }
    }
    

    ispis+='</table>'

    $("#tabelaRezervacije").html(ispis)

    $(".otkaziRez").click(otkaziRezervaciju)
}

function otkaziRezervaciju(e){
    e.preventDefault()
    var idrez=this.dataset.id
    var redUTabeli=$(this).parent().parent()
    //$(this).parent().parent().remove()
    $.ajax({
        url:"model/otkaziRez.php",
        method:"get",
        dataType:"json",
        data:{
            "dugme":true,
            "idRez":idrez
        },
        success:function(data){
            redUTabeli.remove()
        },
        error:function(xhr){
            $redUTabeli.html(xhr.responseText)
        }
    })
}

function posaljiPoruku(){
    var ime=$("#imeKontakt").val()
    var prezime=$("#prezimeKontakt").val()
    var telefon=$("#telefonKontakt").val()
    var mail=$("#mailKontakt").val()
    var poruka=$("#porukaKontakt").val()

    var regImePrezime=/^[A-ZŠĐŽČĆ][a-zšđžčć]{2,19}$/
    var regTelefon=/^06\d{1}\/\d{7}$/
    var regEmail=/^\w[.\d\w]*\@[a-z]{2,10}(\.[a-z]{2,3})+$/
    var poruka=poruka.split(" ")

    var greske=0;

    console.log(telefon)

    if(!regImePrezime.test(ime)){
        $("#porukaIme").html("Ime mora početi velikim slovom i ima najmanje 3, a najviše 20 slova")
        greske++
    }
    else{
        $("#porukaIme").html("")
    }
    if(!regImePrezime.test(prezime)){
        $("#porukaPrezime").html("Prezime mora početi velikim slovom i ima najmanje 3, a najviše 20 slova")
        greske++
    }
    else{
        $("#porukaPrezime").html("")
    }
    if(!regEmail.test(mail)){
        $("#porukaMail").html("E-mail format: jana.matovic.139.19@ict.edu.rs ili jana@yahoo.com")
        greske++
    }
    else{
        $("#porukaMail").html("")
    }
    if(!regTelefon.test(telefon)){
        $("#porukaTelefon").html("Telefon mora biti u formatu 060/1234567")
        greske++
    }
    else{
        $("#porukaTelefon").html("")
    }
    if(poruka.length<10){
        $("#porukaPoruka").html("Poruka mora imati najmanje 10 reči")
        greske++
    }
    else{
        $("#porukaPoruka").html("")
    }

    if(greske==0){
        $.ajax({
            url:"model/poruka.php",
            method:"post",
            dataType:"json",
            data:{
                "ime":ime,
                "prezime":prezime,
                "telefon":telefon,
                "mail":mail,
                "poruka":poruka,
                "dugme":true
            },
            success:function(data){
                $("input[type='text']").val("")
                $("textarea").val("")
                $("#porukaForma").html(data)
            },
            error:function(xhr){
                $("#porukaForma").html(xhr.responseText)
            }
        })
    }
}

$("#btnReg").click(function(){
    var ime=$("#imeReg").val()
    var prezime=$("#prezimeReg").val()
    var email=$("#emailReg").val()
    var korIme=$("#korImeReg").val()
    var telefon=$("#telefonReg").val()
    var lozinka=$("#lozinkaReg").val()



    var regImePrezime=/^[A-ZŠĐŽČĆ][a-zšđžčć]{2,19}$/
    var regTelefon=/^06\d{1}\/\d{7}$/
    var regEmail=/^\w[.\d\w]*\@[a-z]{2,10}(\.[a-z]{2,3})+$/
    var regKorIme=/^.{5,15}$/;
    var regLozinka=/^.{8,15}$/;

    var greske=0

    if(!regImePrezime.test(ime) || !regImePrezime.test(prezime)){
        $("#greskaImePrezime").html("Ime i prezime moraju početi velikim slovom i imaju najmanje 3, a najviše 20 slova")
        greske++
    }
    else{
        $("#greskaImePrezime").html("")
    }
    if(!regEmail.test(email)){
        $("#greskaEmail").html("E-mail format: jana.matovic.139.19@ict.edu.rs ili jana@yahoo.com")
        greske++
    }
    else{
        $("#greskaEmail").html("")
    }
    if(!regTelefon.test(telefon)){
        $("#greskaTelefon").html("Telefon mora biti u formatu 060/1234567")
        greske++
    }
    else{
        $("#greskaTelefon").html("")
    }
    if(!regKorIme.test(korIme)){
        $("#greskaKorIme").html("Korisničko ime mora imati najmanje 5, a najviše 15 karaktera")
        greske++
    }
    else{
        $("#greskaKorIme").html("")
    }
    if(!regLozinka.test(lozinka)){
        $("#greskaLozinka").html("Lozinka mora imati najmanje 8, a najviše 15 karaktera")
        greske++
    }
    else{
        $("#greskaLozinka").html("")
    }

    if(greske==0){
        $.ajax({
            url:"model/registracija.php",
            method:"post",
            dataType:"json",
            data:{
                "ime":ime,
                "prezime":prezime,
                "korIme":korIme,
                "lozinka":lozinka,
                "telefon":telefon,
                "mail":email,
                "dugme":true
            },
            success:function(data){
                $("#porukaReg").html(data)
            },
            error:function(xhr){
                $("#porukaReg").html(xhr.responseText)
            }
        })
    }
})

function glasaj(){
    var cb=$('input[name="odgovori"]:checked')
    var odg=cb.val()

    if(odg!=undefined){
        $.ajax({
            url:'model/glasaj.php',
            method:"POST",
            dataType:"json",
            data:{
                "odg":odg,
                "dugme":true
            },
            success:function(data){
                $("#porukaAnketa").html(data);
                $('input[name="odgvori"]').attr("disabled",true)
            },
            error:function(xhr){
                $("#greskaAnketa").html(JSON.parse(xhr.responseText))
            }
        })
    }
    else{
        $("#porukaAnketa").html("Morate izabrati odgovor");
    }
}

/******* ADMIN PANEL ******/

function adminLinkovi(e){
    e.preventDefault()
    var izbor=this.dataset.name
    console.log(izbor)

    if(izbor=="svePredstave"){
        dohvatiSvePredstave()
    }
    if(izbor=="dodajPredstavu"){
        formaDodajPredstavu()
    }
    if(izbor=="repertoar"){
        prikaziRepertoar()
    }
    if(izbor=="repertoarStari"){
        stariRepertoar()
    }
    if(izbor=="dodajRepertoar"){
        dodajRepertoar()
    }
    if(izbor=="rezervacije"){
        rezervacijeAdmin()
    }
    if(izbor=="korisnici"){
        korisnici()
    }
    if(izbor=="poruke"){
        porukePrikazi()
    }
    if(izbor=="anketa"){
        anketaRezultati()
    }
}

function dohvatiSvePredstave(){
    $("#adminNaslov").html("Sve predstave")
    $.ajax({
        url:'model/predstave.php',
        method:"GET",
        dataType:"json",
        success:function(data){
            ispisiPredstaveAdmin(data)
        },
        error:function(xhr){
            $("#sadrzajAdmin").html(JSON.parse(xhr.responseText))
        }
    })
}

function ispisiPredstaveAdmin(data){
    var ispis=''
    ispis+=`<table><tr><th>Naslov</th><th>Slika</th><th>Izmeni</th><th>Obriši</th></tr>`
    for(let d of data){

        ispis+=`<tr>
            <td>${d.naziv}</td>
            <td><img src="assets/images/${d.slikasrc}" alt="${d.naziv}"/></td>
            <td><a href="#" data-id="${d.idPredstava}" class="izmeniPredstavu">Izmeni</a></td>
            <td><a href="#" class="linkObrisiPredstavu" data-id="${d.idPredstava}">Obriši</a></td>
        </tr>`

    }

    ispis+=`</table><div id="formaPredstava"></div>`

    $("#sadrzajAdmin").html(ispis)

    $(".linkObrisiPredstavu").click(obrisiPredstavu)

    $(".izmeniPredstavu").click(izmeniPredstavu)
}

function izmeniPredstavu(e){
    e.preventDefault()
    var id=this.dataset.id

    $.ajax({
        url:'model/predstavaAdmin.php',
        method:"GET",
        dataType:"json",
        data:{
            "id":id,
            "dugme":true
        },
        success:function(data){
            var ispis=`<h2>Izmeni ${data.naziv}</h2>
            <form action="" enctype="multipart/form-data">
            <p>Naslov</p>
            <input type="text" id="naslovIzmeni" value="${data.naziv}"/>
            <p>Premijera</p>
            <input type="date" id="premijeraIzmeni" value="${data.premijera}"/>
            <p>Sadržaj</p>
            <textarea id="sadrzajIzmeni">${data.sadrzaj}</textarea>
            <p>Poster</p>
            <input type="file" id="slikaIzmeni"/>
            <p>Cena</p>
            <input type="text" id="cenaIzmeni" value="${data.cena}"/>
            <input type="hidden" id="id" value="${data.idPredstava}"/>
            <br><br>
            <input type="button" value="Izmeni" id="predstavaIzmeni"/>
            </form>
            <p id="porukaIzmeniPredstavu"></p>`

            
            $("#formaPredstava").html(ispis)

            $("#predstavaIzmeni").click(izmeniPredstavuBtn)
        },
        error:function(xhr){
            $("#sadrzajAdmin").html(JSON.parse(xhr.responseText))
        }
    })

}


function izmeniPredstavuBtn(){
    var naslov=document.getElementById("naslovIzmeni").value
    var premijera=document.getElementById("premijeraIzmeni").value
    var sadrzaj=document.getElementById("sadrzajIzmeni").value
    var cena=document.getElementById("cenaIzmeni").value
    var id=document.getElementById("id").value
    var slika=document.getElementById("slikaIzmeni").files[0]



    var podaciZaSlanje=new FormData()

    podaciZaSlanje.append("naslov",naslov)
    podaciZaSlanje.append("premijera",premijera)
    podaciZaSlanje.append("sadrzaj",sadrzaj)
    podaciZaSlanje.append("slika",slika)
    podaciZaSlanje.append("cena",cena)
    podaciZaSlanje.append("id",id)
    podaciZaSlanje.append("dugme",true)


    $.ajax({
        url:'model/izmeniPredstavu.php',
        method:"POST",
        processData:false,
        contentType:false,
        data:podaciZaSlanje,
        success:function(data){
            $("#porukaIzmeniPredstavu").html(JSON.parse(data))
        },
        error:function(xhr){
            $("#porukaDodajPredstavu").html(JSON.parse(xhr.responseText))
        }
    })
}

function obrisiPredstavu(e){
    e.preventDefault()
    var id=this.dataset.id

    var redZaBrisanje=$(this).parent().parent()

    $.ajax({
        url:'model/obrisiPredstavu.php',
        method:"POST",
        dataType:"json",
        data:{
            "id":id,
            "dugme":true
        },
        success:function(data){
            if(data=="ok"){
                redZaBrisanje.remove()
            }
            else{
                redZaBrisanje.html(data)
            }
        },
        error:function(xhr){
            $("#sadrzajAdmin").html(JSON.parse(xhr.responseText))
        }
    })
}

function formaDodajPredstavu(){
    $("#adminNaslov").html("Dodaj predstavu")
    var ispis=`
    
    <form action="" enctype="multipart/form-data">
        <p>Naslov</p>
        <input type="text" id="naslovP"/>
        <p>Premijera</p>
        <input type="date" id="premijeraP"/>
        <p>Sadržaj</p>
        <textarea id="sadrzajP"></textarea>
        <p>Poster</p>
        <input type="file" id="slikaP"/>
        <p>Cena</p>
        <input type="text" id="cenaP"/>
        <br><br>
        <input type="button" value="Dodaj" id="dodajPredstavu"/>
    </form>
    <p id="porukaDodajPredstavu"></p>
    `
    $("#sadrzajAdmin").html(ispis)

    $("#dodajPredstavu").click(dodajPredstavu)
}

function dodajPredstavu(){

    var naslov=document.getElementById("naslovP").value
    var premijera=document.getElementById("premijeraP").value
    var sadrzaj=document.getElementById("sadrzajP").value
    var cena=document.getElementById("cenaP").value
    var slika=document.getElementById("slikaP").files[0]



    var podaciZaSlanje=new FormData()

    podaciZaSlanje.append("naslov",naslov)
    podaciZaSlanje.append("premijera",premijera)
    podaciZaSlanje.append("sadrzaj",sadrzaj)
    podaciZaSlanje.append("slika",slika)
    podaciZaSlanje.append("cena",cena)
    podaciZaSlanje.append("dugme",true)


    $.ajax({
        url:'model/dodajPredstavu.php',
        method:"POST",
        dataType:"json",
        processData:false,
        contentType:false,
        data:podaciZaSlanje,
        success:function(data){
            $("#porukaDodajPredstavu").html(data)
        },
        error:function(xhr){
            $("#porukaDodajPredstavu").html(JSON.parse(xhr.responseText))
        }
    })

}

function prikaziRepertoar(){
    $("#adminNaslov").html("Repertoar")

    $.ajax({
        url:'model/repertoarAdmin.php',
        method:"GET",
        dataType:"json",
        success:function(data){
           ispisRepertoar(data)
        },
        error:function(xhr){
            $("#sadrzajAdmin").html(JSON.parse(xhr.responseText))
        }
    })
}

function ispisRepertoar(data){
    var ispis=""
    ispis+=`<table><tr><th>Naslov</th><th>Datum</th><th>Izmeni</th><th>Obriši</th></tr>`
    for(let d of data){

        ispis+=`<tr>
            <td>${d.naziv}</td>
            <td>${d.datum.split("-")[2]}.${d.datum.split("-")[1]}.${d.datum.split("-")[0]}.</td>
            <td><a href="#" class="izmeniRepertoar" data-naziv="${d.naziv}" data-datum="${d.datum}" data-id=${d.idRepertoar}>Izmeni</a></td>
            <td><a href="#" class="obrisiRepertoar"  data-id=${d.idRepertoar}>Obriši</a></td>
        </tr>`

    }

    ispis+=`</table><div id="formaDatum"></div>`
    $("#sadrzajAdmin").html(ispis)

    $(".obrisiRepertoar").click(obrisiSaRepertoara)
    $(".izmeniRepertoar").click(izmeniRepertoar)
}


function izmeniRepertoar(e){
    e.preventDefault()
    var id=this.dataset.id
    var datum=this.dataset.datum
    var naziv=this.dataset.naziv
    var ispis=`<h2>${naziv}</h2><form>
        <input type="date" value="${datum}" id="datum"/>
        <input type="hidden" value="${id}" id="id"/>
        <br></br>
        <input type="button" value="Izmeni datum" id="izmeniDatum"/>
    </form><p id="greskaUpdate"></p>`

    $("#formaDatum").html(ispis)

    $("#izmeniDatum").click(izmeniDatum)

}

function izmeniDatum(){
    var id=$("#id").val()
    var datum=$("#datum").val()

    $.ajax({
        url:'model/izmeniRepertoar.php',
        method:"POST",
        data:{
            "idPredstava":id,
            "datum":datum,
            "dugme":true
        },
        success:function(data){
            $("#greskaUpdate").html(JSON.parse(data))
        },
        error:function(xhr){
            $("#greskaUpdate").html(JSON.parse(xhr.responseText))
        }
    })
}

function obrisiSaRepertoara(e){
    e.preventDefault()
    var id=this.dataset.id

    var redZaBrisanje=$(this).parent().parent()

    $.ajax({
        url:'model/obrisiRepertoar.php',
        method:"POST",
        dataType:"json",
        data:{
            "id":id,
            "dugme":true
        },
        success:function(data){
            if(data=="ok"){
                redZaBrisanje.remove()
            }
            else{
                redZaBrisanje.html(data)
            }
        },
        error:function(xhr){
            $("#sadrzajAdmin").html(JSON.parse(xhr.responseText))
        }
    })

}
function dodajRepertoar(){
    $("#adminNaslov").html("Dodaj na repertoar")

    $.ajax({
        url:'model/predstave.php',
        method:"GET",
        dataType:"json",
        success:function(predstava){
            var ispis=`
                <form action="">
                    <p>Naslov</p>
                    <select id="nazivPredstave">
                        <option value="0">Izaberi</option>`

                    for(let p of predstava){
                        ispis+=`<option value="${p.idCena}">${p.naziv}</option>`
                    }
                    ispis+=`</select>
                    <p>Datum</p>
                    <input type="date" id="datumIgranja"/>
                    <br><br>
                    <input type="button" value="Dodaj" id="dodajNaRepertoar"/>
                </form>
                <p id="greskaDodajRep"></p>
                `

                $("#sadrzajAdmin").html(ispis)

                $("#dodajNaRepertoar").click(dodajNaRepertoar)

        },
        error:function(xhr){
            $("#sadrzajAdmin").html(JSON.parse(xhr.responseText))
        }
    })

}

function dodajNaRepertoar(){
    var predstava=$("#nazivPredstave").val()
    var datum=$("#datumIgranja").val()
    
    if(predstava=="0"){
        $("#greskaDodajRep").html("Morate izabrati predstavu")
        return false
    }
    else{
        $("#greskaDodajRep").html("")
    }
    if(datum==""){
        $("#greskaDodajRep").html("Morate izabrati datum")
        return false
    }
    else{
        $("#greskaDodajRep").html("")
    }
    $.ajax({
        url:'model/dodajRepertoar.php',
        method:"POST",
        dataType:"json",
        data:{
            "idPredstava":predstava,
            "datum":datum,
            "dugme":true
        },
        success:function(data){
            $("#greskaDodajRep").html(data)
        },
        error:function(xhr){
            $("#greskaDodajRep").html(JSON.parse(xhr.responseText))
        }
    })
}

function rezervacijeAdmin(){
    $("#adminNaslov").html("Rezervacije")

    $.ajax({
        url:'model/rezervacijeAdmin.php',
        method:"GET",
        dataType:"json",
        success:function(predstava){
            if(predstava=="nema"){
                $("#sadrzajAdmin").html("Nema rezervacija")
            }
            else{
                var ispis=`<table><tr><th>Naslov</th><th>Datum</th><th>Korisnik</th><th>Broj karata</th><th>Obriši</th></tr>`
                for(let d of predstava['rez']){

                    ispis+=`<tr>
                        <td>${d.naziv}</td>
                        <td>${d.datum.split("-")[2]}.${d.datum.split("-")[1]}.${d.datum.split("-")[0]}.</td>
                        <td>${d.ime} ${d.prezime}</td>
                        <td>${d.broj}</td>
                        <td><a href="#" class="obrisiRezAdmin" data-id="${d.idRezervacija}">Obriši</a></td>
                    </tr>`

                }

                ispis+=`</table>
                <p>*Prilikom kupovine, obrisati rezervaciju. Korisnika obavestiti e-mailom da li je rezervacija prihvaćena ili ne. Ukoliko je odbijena, rezervaciju obrisati</p>
                `

                ispis+=`<br><br><p>Broj rezervacija po predstavi</p>`
                    ispis+=`<table><tr><th>Naslov</th><th>Datum</th><th>Ukupno karata</th></tr>`
                for(let d of predstava['ukupno']){

                    ispis+=`<tr>
                        <td>${d.naziv}</td>
                        <td>${d.datum.split("-")[2]}.${d.datum.split("-")[1]}.${d.datum.split("-")[0]}.</td>
                        <td>${d.broj}</td>
                    </tr>`

                }

                ispis+=`</table>`
                
                $("#sadrzajAdmin").html(ispis)

                $(".obrisiRezAdmin").click(obrisiRezervacijuAdmin)
            }
            

        },
        error:function(xhr){
            $("#sadrzajAdmin").html(JSON.parse(xhr.responseText))
        }
    })

}
function obrisiRezervacijuAdmin(e){
    e.preventDefault()
    var id=this.dataset.id

    var redZaBrisanje=$(this).parent().parent()

    $.ajax({
        url:'model/otkaziRez.php',
        method:"GET",
        dataType:"json",
        data:{
            "idRez":id,
            "dugme":true
        },
        success:function(data){
            if(data=="ok"){
                rezervacijeAdmin()
            }
            else{
                redZaBrisanje.html(data)
            }
        },
        error:function(xhr){
            $("#sadrzajAdmin").html(JSON.parse(xhr.responseText))
        }
    })
}
function korisnici(){
    $("#adminNaslov").html("Korisnici")
    $.ajax({
        url:'model/korisnici.php',
        method:"GET",
        dataType:"json",
        success:function(korisnici){
            var ispis=`<table><tr><th>Ime i prezime</th><th>E-mail</th><th>Korisničko ime</th><th>Telefon</th></tr>`
            for(let k of korisnici){
        
                ispis+=`<tr>
                    <td>${k.ime} ${k.prezime}</td>
                    <td>${k.email}</td>
                    <td>${k.korisnickoime}</td>
                    <td>${k.telefon}</td>
                </tr>`
        
            }
        
            ispis+=`</table>`
            $("#sadrzajAdmin").html(ispis)
        },
        error:function(xhr){
            $("#sadrzajAdmin").html(JSON.parse(xhr.responseText))
        }
    })
}


function porukePrikazi(){
    $("#adminNaslov").html("Poruke")
    $.ajax({
        url:'model/poruke.php',
        method:"GET",
        dataType:"json",
        success:function(poruke){
            var ispis=`<table><tr><th>Ime i prezime</th><th>E-mail</th><th>Telefon</th><th>Poruka</th><th>Obriši</th></tr>`
            for(let p of poruke){
        
                ispis+=`<tr>
                    <td>${p.ime} ${p.prezime}</td>
                    <td>${p.email}</td>
                    <td>${p.telefon}</td>
                    <td>${p.poruka}</td>
                    <td><a href="#" class="obrisiPoruke" data-id="${p.idPoruke}">Obriši</a></td>
                </tr>`
        
            }
        
            ispis+=`</table>`
            $("#sadrzajAdmin").html(ispis)

            $(".obrisiPoruke").click(obrisiPoruku)
        },
        error:function(xhr){
            $("#sadrzajAdmin").html(JSON.parse(xhr.responseText))
        }
    })
}

function obrisiPoruku(e){
    e.preventDefault()
    var id=this.dataset.id

    var redZaBrisanje=$(this).parent().parent()

    $.ajax({
        url:'model/obrisiPoruku.php',
        method:"post",
        dataType:"json",
        data:{
            "id":id,
            "dugme":true
        },
        success:function(data){
            if(data=="ok"){
                redZaBrisanje.remove()
            }
            else{
                redZaBrisanje.html(data)
            }
        },
        error:function(xhr){
            $("#sadrzajAdmin").html(JSON.parse(xhr.responseText))
        }
    })
}
function anketaRezultati(){
    $("#adminNaslov").html("Rezultati ankete")
    $.ajax({
        url:'model/anketaRezultati.php',
        method:"GET",
        dataType:"json",
        success:function(anketa){
            var ispis=`<h2>${anketa['pitanje']}</h2>`
            for(let o of anketa['odgovori']){
                ispis+=`<p>${o.tekst} : ${o.broj}%</p>`
            }

            if(anketa['aktivna']==1){
                ispis+=`<a href="#" id="anketaOnemoguci">Onemogući anketu</a>`
            }
            else{
                ispis+=`<a href="#" id="anketaOmoguci">Aktiviraj anketu</a>`
            }
            $("#sadrzajAdmin").html(ispis)

            $("#anketaOmoguci").click(omoguciAnketu)
            $("#anketaOnemoguci").click(onemoguciAnketu)
        },
        error:function(xhr){
            $("#sadrzajAdmin").html(JSON.parse(xhr.responseText))
        }
    })
}

function omoguciAnketu(e){
    e.preventDefault()
    $.ajax({
        url:'model/omoguciAnketu.php',
        method:"post",
        dataType:"json",
        success:function(data){
            if(data=="ok"){
                anketaRezultati()
            }
            else{
                $("#sadrzajAdmin").html(data)
            }
        },
        error:function(xhr){
            $("#sadrzajAdmin").html(JSON.parse(xhr.responseText))
        }
    })
}

function onemoguciAnketu(e){
    e.preventDefault()
    $.ajax({
        url:'model/onemoguciAnketu.php',
        method:"post",
        dataType:"json",
        success:function(data){
            if(data=="ok"){
                anketaRezultati()
            }
            else{
                $("#sadrzajAdmin").html(data)
            }
        },
        error:function(xhr){
            $("#sadrzajAdmin").html(JSON.parse(xhr.responseText))
        }
    })
}