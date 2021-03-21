-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2021 at 05:33 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pozoriste`
--

-- --------------------------------------------------------

--
-- Table structure for table `anketa`
--

CREATE TABLE `anketa` (
  `idAnketa` int(255) NOT NULL,
  `pitanje` varchar(255) NOT NULL,
  `aktivna` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `anketa`
--

INSERT INTO `anketa` (`idAnketa`, `pitanje`, `aktivna`) VALUES
(1, 'Koliko naših predstava ste pogledali?', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cena`
--

CREATE TABLE `cena` (
  `idCena` int(255) NOT NULL,
  `cena` int(50) NOT NULL,
  `datumOd` date NOT NULL DEFAULT current_timestamp(),
  `idPredstava` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cena`
--

INSERT INTO `cena` (`idCena`, `cena`, `datumOd`, `idPredstava`) VALUES
(1, 800, '2021-02-21', 3),
(2, 1000, '2021-02-21', 1),
(3, 1200, '2021-02-21', 2),
(4, 1100, '2021-02-26', 4),
(5, 1500, '2021-02-28', 5),
(6, 1400, '2021-02-28', 6),
(8, 1100, '2021-03-02', 11);

-- --------------------------------------------------------

--
-- Table structure for table `korisnik`
--

CREATE TABLE `korisnik` (
  `idKorisnik` int(255) NOT NULL,
  `ime` varchar(20) NOT NULL,
  `prezime` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `korisnickoime` varchar(255) NOT NULL,
  `lozinka` varchar(255) NOT NULL,
  `kod` varchar(255) NOT NULL,
  `telefon` varchar(15) NOT NULL,
  `aktivan` int(11) NOT NULL,
  `idUloga` int(255) NOT NULL,
  `datum` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `korisnik`
--

INSERT INTO `korisnik` (`idKorisnik`, `ime`, `prezime`, `email`, `korisnickoime`, `lozinka`, `kod`, `telefon`, `aktivan`, `idUloga`, `datum`) VALUES
(2, 'Jana', 'Matovic', 'jana@gmail.com', 'janaa', '4d3d7cccdcecd6086b6b9ce6068e8d0c', 'dsa', '061111111', 1, 1, '2021-03-01'),
(4, 'Petar', 'Petrovic', 'petar@gmail.com', 'petar', 'ee33b3bc92b59d4bae6011d118dfd78c', 'c74d5e21d6fe5e5999a8a6529f832b47', '060/1234567', 1, 2, '2021-03-01');

-- --------------------------------------------------------

--
-- Table structure for table `meni`
--

CREATE TABLE `meni` (
  `idMeni` int(255) NOT NULL,
  `naziv` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `prikaz` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meni`
--

INSERT INTO `meni` (`idMeni`, `naziv`, `link`, `prikaz`) VALUES
(1, 'Početna', 'index.php', 0),
(2, 'Predstave', 'predstave.php', 0),
(3, 'Repertoar', 'repertoar.php', 0),
(4, 'Kontakt', 'kontakt.php', 0),
(5, 'Rezervacije', 'rezervacije.php', 1),
(6, 'Admin panel', 'admin.php', 2),
(7, 'Autor', 'autor.php', 0);

-- --------------------------------------------------------

--
-- Table structure for table `odgovoranketa`
--

CREATE TABLE `odgovoranketa` (
  `idOdgovorAnketa` int(255) NOT NULL,
  `idOdgovor` int(255) NOT NULL,
  `idKorisnik` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `odgovoranketa`
--

INSERT INTO `odgovoranketa` (`idOdgovorAnketa`, `idOdgovor`, `idKorisnik`) VALUES
(7, 7, 4),
(10, 9, 2);

-- --------------------------------------------------------

--
-- Table structure for table `odgovori`
--

CREATE TABLE `odgovori` (
  `idOdgovor` int(255) NOT NULL,
  `tekst` varchar(255) NOT NULL,
  `idAnkete` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `odgovori`
--

INSERT INTO `odgovori` (`idOdgovor`, `tekst`, `idAnkete`) VALUES
(7, '0-5', 1),
(8, '6-10', 1),
(9, 'Više od 10', 1);

-- --------------------------------------------------------

--
-- Table structure for table `poruke`
--

CREATE TABLE `poruke` (
  `idPoruke` int(255) NOT NULL,
  `ime` varchar(20) NOT NULL,
  `prezime` varchar(20) NOT NULL,
  `telefon` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `poruka` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `poruke`
--

INSERT INTO `poruke` (`idPoruke`, `ime`, `prezime`, `telefon`, `email`, `poruka`) VALUES
(2, 'Pera', 'Peric', '060/1234567', 'pera@gmail.com', 'Dobar dan! Da li moze da se dobije popust prilikom kupovine za penzionere? Pozdrav.');

-- --------------------------------------------------------

--
-- Table structure for table `predstava`
--

CREATE TABLE `predstava` (
  `idPredstava` int(255) NOT NULL,
  `naziv` varchar(255) NOT NULL,
  `premijera` date NOT NULL,
  `slikasrc` varchar(255) NOT NULL,
  `sadrzaj` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `predstava`
--

INSERT INTO `predstava` (`idPredstava`, `naziv`, `premijera`, `slikasrc`, `sadrzaj`) VALUES
(1, 'Sa druge strane jastuka', '2020-10-09', 'sadrugestranejastuka.jpg', 'Najnoviji mjuzikl Sa druge strane jastuka mesto je magičnog susreta niza stvari. Najpre, ovo je novi spoj Pozorišta i muzike Momčila Bajagića Bajage koja ima posebno mesto, ne samo u našoj pop muzici, već znatno šire, na prostorima čitavog našeg regiona. S obzirom da je mjuzikl naše trajno repertoarsko opredeljenje i imajući u vidu da je domaći mjuzikl originalni proizvod, bilo je sasvim logično da nakon Bore Đorđevića i Zdravka Čolića, u ovom trenutku i Bajagina muzika postane naš finalni izbor. Slično kao što je muzika grupe ABBA, jednog od najvećih pop bendova svih vremena, bila pokretač mjuzikla Mamma Mia!. U novom mjuziklu, naš poznati dramski pisac, Stevan Koprivica, ljubavnu priču dvoje mladih koja se dešava na Terazijama, kao jednom delu naše metropole, prevodi u komad čiji je glavni junak, zapravo – čitav Beograd!\r\n'),
(2, 'Mamma mia', '2015-03-27', 'mamamia.jpg', 'Nije potrebna naročita domišljatost niti veliko umeće da se muzičko pozorište odluči za igranje mjuzikla „Mamma Mia!“. Reč je o jednom od najuspešnijih savremenh mjuzikala na svetu koji je osvojio Brodvej i na desetine pozorinica širom sveta. Stoga se kao najlogičnije nameće pitanje: u čemu se sastoji tajna ogromnog uspeha mjuzikla „Mamma Mia!“? Naravno da je jedan od mogućih, i sigurno ozbiljnijih razloga, muzika grupe ABBA. Ali to smo znali i ranije. Muzika ove grupe postoji od evrovizijske pobede 1974. godine. Drugo, nije „Mamma Mia!“ prvi mjuzikl  koji koristi  popularnu muziku. Upravo je na Brodveju kolosalno propao mjuzikl „The last ship“ čija je  muzička osnova bila Stingova muzika. Nije pomoglo ni što je ovaj planetarno poznati muzičar lično zaigrao u predstavi. Izgleda da je u slučaju „Mama Mia!“ proradilo i nešto što se često lako gubi iz vida  kada je reč ne samo o mjuziklu. Iza svakog uspešnog projekta „stoji“ vesela, tužna, dramatična, sentimantalna – kakva god, ali na kraju krajeva  dobro ispričana  priča. Ako nje nema, nema ni predstave. Čak i kada je reč o plesnom projektu.\r\n'),
(3, 'Glavo luda', '2012-09-28', 'glavoluda.jpg', '„Prva reč komada „Glavo luda“ napisana je davne 2001. godine. Na početku o muzici nisam uopšte razmišljao. Sticajem okolnosti, jedne večeri dok sam radio na tekstu, u pozadini se čula muzika sa nekog radija. Bila je to Čolina pesma „Produži dalje“. Slušajući reči, rodila se kompletna ideja i razvila u tekst kakav danas imamo. Gotovo sve Zdravkove pesme koje sam tada odabrao, zadržane su i do danas.\r\n\r\nMjuzikl „Glavo luda“ nije priča o životu našeg poznatog izvođača, već o članovima jednog rokenrol benda iz predgrađa koji prolazi kroz razne faze odrastanja i muzičkog sazrevanja. Ona nam donosi duh bezbrižnih osamdesetih, a pesme su svojevrstan pečat vremena i kao takvi slika Jugoslavije kakva je nekada bila.\r\n\r\nOkupio sam autorski tim koji mi je pomogao da se ideja uobliči u kompletan pozorišni komad, kako dramaturški, tako i muzički, plesno, likovno. Pored iskusnih kolega iz kuće, u predstavi učestvuju mladi glumci koji započinju karijeru kao što sam je i ja započeo pre 18 godina putem audicije.\r\n'),
(4, 'Zona Zamfirova', '2015-11-09', 'zona.jpg', 'Svaki put kada se nađe pred novim projektom pozorište je u sličnoj poziciji kao pisac pred belim papirom. Naročito je teško, čak je vraški teško popuniti „prazninu scene“ u slučaju domaćeg mjuzikla. S obzirom da smo mi kuća koja je finansirana iz budžeta Grada Beograda tim pre smo obavezni i prema sebi i srpskoj kulturi uopšte, da kontinuirano kreativno promišljamo našu (dramsku) literaturu u skladu sa svojim osnovnim repertoarskim opredeljenjem. Stoga nije čudno što se na sceni izvodi „Zona Zamfirova“ naprotiv. Junaci Stevana Sremca i njihovi međusobni odnosi „izvedeni“ su na scenu upravo na način koji podarzumeva stil pozorišta kao što je mjuzikl. Pri tom, osnovna ideja kojom se rukovodio autorski tim predvođen Kokanom Mladenovićem, sa kojim smo pre početka rada postigli punu saglasnost, jeste neke vrsta otklona od stereotipne interpetacije ove, ako to nije pretenciozno kazati, naše verzije Romea i Julije. Na prvom mestu otklon je napravljen na nivou same priče. Najpre je obuhvaćen društveni kontekst ondašnje tek oslobođene Srbije izašle iz feudalnog načina života. Potom su snažno zaoštreni odnosi između klase bogataša koju simbolizuje Hadži Zamfir i nižih socijalnih slojeva društva, sitnih zanatlija i malih privrednika koje predvodi neobuzdani Mane. Drugo, bekstvo od stereotipa izraženo je i u muzici koja ne beži od foklora ali je neočekivana i u aranžmanu i osnovnom stilskom opredeljenju. Ovaj put je na nivou igre i plesa implementiran step koji nije bio preterano zastupljen u dosadašnjim koreografskim rešenjima.\n'),
(5, 'Chicago', '2006-10-19', 'chicago.jpg', 'Radnja mjuzikla ”Čikago” odigrava se u istoimenom ozloglašenom američkom gradu dvadesetih godina 20. veka. U središtu radnje je neodoljiva plavuša Roksi, neostvarena barska pevačica i žena koja je ubila svog ljubavnika, zato što nju ”niko ne sme da ostavi”! Došavši u zatvor upoznaje poznatu barsku pevačicu, smeđokosu i zaista ”ubistvenu” Velmu (koja je ubila svoju sestru i svog muža zatekavši ih u preljubi) – kao i ostale zatvorenice, uglavnom ubice nevernih muškaraca. Velmu brani slavni advokat koga, prilikom preuzimanja odbrane zanima samo da li okrivljena ima 5000 dolara za njegov honorar. Kada Roksi pristane na visinu njegovog honorara, on krene u beskompromisnu manipulaciju, kako medija, tako i nje same…\n\nMjuzikl ”Čikago”, iako na prvi pogled mračnog sadržaja i oštrog i satiričnog oslikavanja stanja u američkom društvu, je veoma popularan kod publike. Kao razlog tolikog uspeha, navode se, pre svega, odlična muzika i koreografija Boba Fosija, kao i njegova izuzetna režija, koja nas u svet gangsterskog Čikaga uvodi kao u neki veliki kabare. Drugi razlog uspeha leži, verovatno, u godini njegove premijere. Naime, sedamdesete godine donele su građanima Amerike veliko razočarenje u ”američki san”, a otkrivanjem istine o vijetnamskom ratu, na ”svetlosti pozornice” izneta je prava slika o licemerju američkog društvenog morala. Treći razlog je, de facto, opčinjenost publike fotogeničnom slikom Čikaga sa prepoznatljivim gangsterskim imidžom, koji je privlačio publiku neodoljivim ukusom ”zabranjenog voća: alkohola u vreme prohibicije i ludim provodima sa ženama ”sumnjivog morala”.'),
(6, 'Neki to vole vruće', '2007-02-09', 'vruce.jpg', 'Soja Jovanović je posebnim nitima bila vezana za naše pozorište. U našoj kući je od 1961. pa do 1999. godine režirala 11 predstava, za koje je publika niz godina tražila kartu više. Posebno mesto u saradnji Soje Jovanović sa Pozorištem na Terazijama, nesumnjivo, zauzima mjuzikl Neki to vole vruće. Bila je to poslednja premijera na ”terazijskoj sceni” – nakon koje počinje četrnaestogodišnje ”izgnanstvo” u Domu kulture ”Vuk Karadžić”.\r\n\r\nI zato, obnova mjuzikla Neki to vole vruće, koju su prema originalnoj rediteljskoj postavci Soje Jovanović (ovoga puta, ponovo na našoj sceni realizovali Rade Marjanović i Svetislav Goncić – zapravo je metaforički luk koji spaja prošlost, sadašnjost i budućnost našeg Pozorišta. Parabola iscrtana u slavu umetnosti, kreativnosti ljudskog duha i neuništive volje za trajanjem. Soja Jovanović je to znala i Soja je u tome umela da nam pomogne.'),
(11, 'Brodvejske vragolije', '2019-12-10', '1614705074bv.jpg', 'Tokom sedam decenija rada, u Pozorištu na Terazijama su izvođene komedije, muzičke predstave, operete i naravno mjuzikli koji su poslednjih par decenija postali osnova repertoara. U međuvremenu, na sceni ovog jedinstvenog teatra u ovom delu Evrope, rođena je kovanica “domaći mjuzikl” koja je kod publike i stručne javnosti dobila punu potvrdu i opravdanje. Okosnicu repertoara naravno i dalje čine licenci brodvejski i naslovi koji se izvode na West End-u, počev od najdugovečnije predstave u zemlji Neki to Vole vruće, preko kultnog Čikaga do mega naslova Fantom iz Opere.\nStoga je bilo prirodno da se posle niza žanrovski različitih predstava na repertoaru pozorišta nađe mjuzikl o mjuziklu, što u osnovi jeste naslov Brodvejske vragolije koji se u originalu zove The Drowsy Chaperone.\n\n');

-- --------------------------------------------------------

--
-- Table structure for table `repertoar`
--

CREATE TABLE `repertoar` (
  `idRepertoar` int(255) NOT NULL,
  `idCena` int(255) NOT NULL,
  `datum` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `repertoar`
--

INSERT INTO `repertoar` (`idRepertoar`, `idCena`, `datum`) VALUES
(1, 1, '2021-03-09'),
(2, 2, '2021-03-10'),
(3, 3, '2021-03-12'),
(4, 1, '2021-03-15'),
(5, 3, '2021-03-03'),
(6, 4, '2021-03-08'),
(7, 6, '2021-03-11'),
(8, 5, '2021-03-05'),
(9, 2, '2021-03-16'),
(10, 1, '2021-03-29'),
(11, 2, '2021-03-18'),
(12, 4, '2021-03-17'),
(13, 6, '2021-03-24'),
(14, 5, '2021-03-25'),
(17, 3, '2021-03-07'),
(18, 4, '2021-03-30'),
(19, 8, '2021-03-04'),
(20, 8, '2021-03-06'),
(21, 8, '2021-03-13'),
(22, 6, '2021-03-14'),
(23, 6, '2021-03-19'),
(24, 1, '2021-03-20'),
(25, 4, '2021-03-21'),
(26, 5, '2021-03-23'),
(27, 5, '2021-03-26'),
(28, 2, '2021-03-28');

-- --------------------------------------------------------

--
-- Table structure for table `rezervacija`
--

CREATE TABLE `rezervacija` (
  `idRezervacija` int(255) NOT NULL,
  `idRepertoar` int(255) NOT NULL,
  `idKorisnik` int(255) NOT NULL,
  `brojKarata` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rezervacija`
--

INSERT INTO `rezervacija` (`idRezervacija`, `idRepertoar`, `idKorisnik`, `brojKarata`) VALUES
(27, 2, 2, 2),
(86, 8, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `uloga`
--

CREATE TABLE `uloga` (
  `idUloga` int(255) NOT NULL,
  `nazivUloge` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `uloga`
--

INSERT INTO `uloga` (`idUloga`, `nazivUloge`) VALUES
(1, 'Admin'),
(2, 'Korisnik');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anketa`
--
ALTER TABLE `anketa`
  ADD PRIMARY KEY (`idAnketa`);

--
-- Indexes for table `cena`
--
ALTER TABLE `cena`
  ADD PRIMARY KEY (`idCena`),
  ADD KEY `idPredstava` (`idPredstava`);

--
-- Indexes for table `korisnik`
--
ALTER TABLE `korisnik`
  ADD PRIMARY KEY (`idKorisnik`),
  ADD KEY `idUloga` (`idUloga`);

--
-- Indexes for table `meni`
--
ALTER TABLE `meni`
  ADD PRIMARY KEY (`idMeni`);

--
-- Indexes for table `odgovoranketa`
--
ALTER TABLE `odgovoranketa`
  ADD PRIMARY KEY (`idOdgovorAnketa`),
  ADD KEY `idOdgovor` (`idOdgovor`),
  ADD KEY `idKorisnik` (`idKorisnik`);

--
-- Indexes for table `odgovori`
--
ALTER TABLE `odgovori`
  ADD PRIMARY KEY (`idOdgovor`),
  ADD KEY `idAnkete` (`idAnkete`) USING BTREE;

--
-- Indexes for table `poruke`
--
ALTER TABLE `poruke`
  ADD PRIMARY KEY (`idPoruke`);

--
-- Indexes for table `predstava`
--
ALTER TABLE `predstava`
  ADD PRIMARY KEY (`idPredstava`);

--
-- Indexes for table `repertoar`
--
ALTER TABLE `repertoar`
  ADD PRIMARY KEY (`idRepertoar`),
  ADD KEY `idPredstava` (`idCena`);

--
-- Indexes for table `rezervacija`
--
ALTER TABLE `rezervacija`
  ADD PRIMARY KEY (`idRezervacija`),
  ADD KEY `idRepertoar` (`idRepertoar`),
  ADD KEY `idKorisnik` (`idKorisnik`);

--
-- Indexes for table `uloga`
--
ALTER TABLE `uloga`
  ADD PRIMARY KEY (`idUloga`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anketa`
--
ALTER TABLE `anketa`
  MODIFY `idAnketa` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cena`
--
ALTER TABLE `cena`
  MODIFY `idCena` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `korisnik`
--
ALTER TABLE `korisnik`
  MODIFY `idKorisnik` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `meni`
--
ALTER TABLE `meni`
  MODIFY `idMeni` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `odgovoranketa`
--
ALTER TABLE `odgovoranketa`
  MODIFY `idOdgovorAnketa` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `odgovori`
--
ALTER TABLE `odgovori`
  MODIFY `idOdgovor` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `poruke`
--
ALTER TABLE `poruke`
  MODIFY `idPoruke` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `predstava`
--
ALTER TABLE `predstava`
  MODIFY `idPredstava` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `repertoar`
--
ALTER TABLE `repertoar`
  MODIFY `idRepertoar` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `rezervacija`
--
ALTER TABLE `rezervacija`
  MODIFY `idRezervacija` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `uloga`
--
ALTER TABLE `uloga`
  MODIFY `idUloga` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cena`
--
ALTER TABLE `cena`
  ADD CONSTRAINT `cena_ibfk_1` FOREIGN KEY (`idPredstava`) REFERENCES `predstava` (`idPredstava`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `korisnik`
--
ALTER TABLE `korisnik`
  ADD CONSTRAINT `korisnik_ibfk_1` FOREIGN KEY (`idUloga`) REFERENCES `uloga` (`idUloga`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `odgovoranketa`
--
ALTER TABLE `odgovoranketa`
  ADD CONSTRAINT `odgovoranketa_ibfk_1` FOREIGN KEY (`idOdgovor`) REFERENCES `odgovori` (`idOdgovor`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `odgovoranketa_ibfk_2` FOREIGN KEY (`idKorisnik`) REFERENCES `korisnik` (`idKorisnik`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `odgovori`
--
ALTER TABLE `odgovori`
  ADD CONSTRAINT `odgovori_ibfk_1` FOREIGN KEY (`idAnkete`) REFERENCES `anketa` (`idAnketa`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `repertoar`
--
ALTER TABLE `repertoar`
  ADD CONSTRAINT `repertoar_ibfk_1` FOREIGN KEY (`idCena`) REFERENCES `cena` (`idCena`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rezervacija`
--
ALTER TABLE `rezervacija`
  ADD CONSTRAINT `rezervacija_ibfk_1` FOREIGN KEY (`idKorisnik`) REFERENCES `korisnik` (`idKorisnik`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rezervacija_ibfk_2` FOREIGN KEY (`idRepertoar`) REFERENCES `repertoar` (`idRepertoar`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
