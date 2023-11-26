import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { LekarComponent } from './lekar/lekar.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { ProfilPacijentComponent } from './profil-pacijent/profil-pacijent.component';
import { LekariComponent } from './lekari/lekari.component';
import { ProfilLekaraPacijentComponent } from './profil-lekara-pacijent/profil-lekara-pacijent.component';
import { PrijavaMenadzerComponent } from './prijava-menadzer/prijava-menadzer.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { MenadzerPacijentComponent } from './menadzer-pacijent/menadzer-pacijent.component';
import { MenadzerLekarComponent } from './menadzer-lekar/menadzer-lekar.component';
import { AzurirajPacijentaMenadzerComponent } from './azuriraj-pacijenta-menadzer/azuriraj-pacijenta-menadzer.component';
import { PacijentPreglediComponent } from './pacijent-pregledi/pacijent-pregledi.component';
import { LekarPreglediComponent } from './lekar-pregledi/lekar-pregledi.component';
import { KartonPacijentaComponent } from './karton-pacijenta/karton-pacijenta.component';
import { NapisiIzvestajComponent } from './napisi-izvestaj/napisi-izvestaj.component';
import { RaznoComponent } from './razno/razno.component';
import { ZahteviRegistracijaComponent } from './zahtevi-registracija/zahtevi-registracija.component';
import { AzurirajLekaraMenadzerComponent } from './azuriraj-lekara-menadzer/azuriraj-lekara-menadzer.component';
import { NoviLekarComponent } from './novi-lekar/novi-lekar.component';
import { NoviPregledZahtevComponent } from './novi-pregled-zahtev/novi-pregled-zahtev.component';
import { SpecijalizacijePreglediComponent } from './specijalizacije-pregledi/specijalizacije-pregledi.component';
import { DodajNoviPregledMenadzerComponent } from './dodaj-novi-pregled-menadzer/dodaj-novi-pregled-menadzer.component';
import { AzurirajPregledMenadzerComponent } from './azuriraj-pregled-menadzer/azuriraj-pregled-menadzer.component';
import { AzurirajProfilPacijentComponent } from './azuriraj-profil-pacijent/azuriraj-profil-pacijent.component';
import { AzurirajProfilLekarComponent } from './azuriraj-profil-lekar/azuriraj-profil-lekar.component';
import { LekarIzborPregledaComponent } from './lekar-izbor-pregleda/lekar-izbor-pregleda.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PocetnaComponent,
    PrijavaComponent,
    PacijentComponent,
    LekarComponent,
    RegistracijaComponent,
    PromenaLozinkeComponent,
    ProfilPacijentComponent,
    LekariComponent,
    ProfilLekaraPacijentComponent,
    PrijavaMenadzerComponent,
    MenadzerComponent,
    MenadzerPacijentComponent,
    MenadzerLekarComponent,
    AzurirajPacijentaMenadzerComponent,
    PacijentPreglediComponent,
    LekarPreglediComponent,
    KartonPacijentaComponent,
    NapisiIzvestajComponent,
    RaznoComponent,
    ZahteviRegistracijaComponent,
    AzurirajLekaraMenadzerComponent,
    NoviLekarComponent,
    NoviPregledZahtevComponent,
    SpecijalizacijePreglediComponent,
    DodajNoviPregledMenadzerComponent,
    AzurirajPregledMenadzerComponent,
    AzurirajProfilPacijentComponent,
    AzurirajProfilLekarComponent,
    LekarIzborPregledaComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
