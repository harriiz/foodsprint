
# foodsprint



FoodSprint je web aplikacija za dostavu hrane koja pruža jednostavno i korisnički prijateljsko sučelje za kupce kako bi naručili hranu iz svojih omiljenih restorana. Sastoji se od kontrolnog centra restorana, kontrolnog centra dostavljača, kontrolnog centra administratora i korisničkog sučelja za kupce kako bi naručili i pratili status dostave.

FoodSprint olakšava proces naručivanja hrane online, omogućavajući kupcima da pregledaju jelovnike, naruče i prate dostave u samo nekoliko klikova. Sistem za upravljanje restoranom omogućava restoranima da dodaju i uređuju stavke jelovnika, dok dostavljački sistem za upravljanje omogućuje dostavljačima da preuzmu dostave i ažuriraju njihov status. Administrativni sistem pruža nadzor i kontrolu nad platformom, a korisničko sučelje je dizajnirano kako bi bilo korisnički prijateljsko i intuitivno.



![Logo](https://foodsprint.onrender.com/static/media/foodsprint-logov6.1d248d4f4db66ac77e4a.png)

## Demo
[Live demo](https://foodsprint.onrender.com)
![](src/components/componentsHero/slike/Screenshot_5.png/Screenshot_5.png?raw=true "Title")

## Features

### Korisničko sučelje 
Korisnici mogu početi proces narudžbe prijavom na svoj račun ili kreiranjem novog računa ako prvi put pristupaju stranici. Nakon prijave, korisnici mogu pregledati različite kategorije restorana kako bi pronašli željeni restoran. Meniji su prikazani jasno i organizirano, što omogućava korisnicima da lako odaberu željene artikle. 

Nakon što su izabrali hranu, korisnici mogu dodati stavke u korpu i preći na potvrdu narudžbe gdje mogu unijeti svoje informacije o dostavi i odabrati željeni način plaćanja.
Posle narudžbe, korisnici mogu koristiti funkciju praćenja narudžbe da prate status 
dostave. Sistem praćenja daje ažuriranja o statusu isporuke u stvarnom vrremenu, omogućavajući korisnicima da budu informirani i da tačno znaju kada da očekuju svoju hranu. 

Ukupno, proces narudžbe na FoodSprintu je dizajniran da bude jednostavan i direktan, pružajući korisnicima praktičan način narudžbe hrane iz dostupnih restorana.

### Restoran panel
Restorani prvo moraju popuniti obrazac za registraciju sa informacijama o restoranu koji žele registrirati. Nakon podnošenja obrasca, restoran će morati čekati da administrator stranice pogleda njihov zahtjev i ako je zahtjev prihvaćen, administrator će kreirati restoran sa informacijama navedenim u zahtjevu i dodijeliti ga profilu restorana koji su kreirali tijekom registracije. 
Sada restoran može pristupiti kontrolnoj ploči restorana gdje može dodavati, uređivati ili brisati stavke menija, hranu u svom restoranu i kreirati nove kategorije za stavke menija. 
Ukupno, kontrolna ploča restorana na FoodSprintu omogućava restoranu da efikasno upravlja svojim menijem i artiklima.
 

Ukupno, proces narudžbe na FoodSprintu je dizajniran da bude jednostavan i direktan, pružajući korisnicima praktičan način narudžbe hrane iz dostupnih restorana.

### Dostavljač panel
Dostavljači moraju prvo popuniti prijavu za registraciju kako bi postali FoodSprint dostavljač. Nakon što administrator prihvati njihovu prijavu, dostavljači će dobiti pristup kontrolnoj ploči dostavljača. 

U kontrolnom centru, dostavljači će vidjeti sve trenutne otvorene narudžbe koje nisu dodijeljene nijednom dostavljaču. Nakon što odaberu narudžbu, dostavljač može prihvatiti neku od otvorenih narudžbi i početi s dostavom. 
Tijekom dostave, dostavljač može ažurirati status dostave, koji ima četiri faze: "Dodijeljeno FoodSprint dostavljaču", "Preuzeto iz restorana", "U tranzitu" i "Dostavljeno". 

S ovim sistemom praćenja, FoodSprint osigurava da su korisnici uvijek u toku s trenutnim statusom njihove narudžbe.

### Admin panel 
Administratori imaj kompletnu kontrolu nad cijelom FoodSprint web stranicom. Njihova uloga uključuje upravljanje i održavanje profila restorana i dostavljača na platformi. To uključuje dodavanje novih restorana ili dostavljača, uređivanje postojećih ili njihovo potpuno uklanjanje. Oni imaju ovlast da odobre ili odbiju prijave koje su poslali restorani ili dostavljači koji žele pridružiti se platformi. Osim toga, oni mogu pratiti statistiku web stranice, pružajući uvide u performanse platforme.


## Korištene tehnologije

**Client:** React, Redux, Mantine UI 

**Server:** Node, Express

**Database:** MongoDB

