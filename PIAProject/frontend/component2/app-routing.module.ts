import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { ZahtevRegistracija } from './models/zahtev_registracija';
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
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:"", component:PocetnaComponent, canActivate: [AuthGuard], data: {requiredRole: '-5'}},
  {path:"prijava", component:PrijavaComponent, canActivate: [AuthGuard], data: {requiredRole: '-5'}},
  {path:"pacijent", component:PacijentComponent,canActivate: [AuthGuard], data: {requiredRole: 'pacijent'}},
  {path:"lekar", component:LekarComponent, canActivate: [AuthGuard], data: {requiredRole: 'lekar'}},
  {path:"registracija", component:RegistracijaComponent, canActivate: [AuthGuard], data: {requiredRole: '-5'}},
  {path:"promena_lozinke", component:PromenaLozinkeComponent, canActivate: [AuthGuard], data: {requiredRole: ['pacijent','lekar','menadzer']}},
  {path:"profil_pacijent", component:ProfilPacijentComponent, canActivate: [AuthGuard], data: {requiredRole: 'pacijent'}},
  {path:"lekari", component:LekariComponent, canActivate: [AuthGuard], data: {requiredRole: 'pacijent'}},
  {path:"profil_lekara/:kor_ime", component:ProfilLekaraPacijentComponent, canActivate: [AuthGuard], data: {requiredRole: 'pacijent'}},
  {path:"prijava_menadzer", component:PrijavaMenadzerComponent, canActivate: [AuthGuard], data: {requiredRole: '-5'}},
  {path:"menadzer", component:MenadzerComponent, canActivate: [AuthGuard], data: {requiredRole: 'menadzer'}},
  {path:"menadzer_pacijent", component:MenadzerPacijentComponent, canActivate: [AuthGuard], data: {requiredRole: 'menadzer'}},
  {path:"menadzer_lekar", component:MenadzerLekarComponent, canActivate: [AuthGuard], data: {requiredRole: 'menadzer'}},
  {path:"azuriraj_pacijenta_menadzer/:kor_ime", component:AzurirajPacijentaMenadzerComponent, canActivate: [AuthGuard], data: {requiredRole: 'menadzer'}},
  {path:"pacijent_pregledi", component:PacijentPreglediComponent, canActivate: [AuthGuard],data: {requiredRole: 'pacijent'}},
  {path:"lekar_pregledi", component:LekarPreglediComponent, canActivate: [AuthGuard],data: {requiredRole: 'lekar'}},
  {path:"karton_pacijenta/:kor_ime_pacijent", component:KartonPacijentaComponent, canActivate: [AuthGuard],data: {requiredRole: 'lekar'}},
  {path:"napisi_izvestaj/:idZP", component:NapisiIzvestajComponent, canActivate: [AuthGuard], data: {requiredRole: 'lekar'}},
  {path:"razno", component:RaznoComponent, canActivate: [AuthGuard], data: {requiredRole: 'lekar'}},
  {path:"zahtevi_registracija", component:ZahteviRegistracijaComponent, canActivate: [AuthGuard],data: {requiredRole: 'menadzer'}},
  {path:"azuriraj_lekara_menadzer/:kor_ime", component:AzurirajLekaraMenadzerComponent, canActivate: [AuthGuard], data: {requiredRole: 'menadzer'}},
  {path:"novi_lekar", component:NoviLekarComponent, canActivate: [AuthGuard], data: {requiredRole: 'menadzer'}},
  {path:"novi_pregled_zahtev", component:NoviPregledZahtevComponent, canActivate: [AuthGuard], data: {requiredRole: 'menadzer'}},
  {path:"specijalizacije_pregledi", component:SpecijalizacijePreglediComponent, canActivate: [AuthGuard], data: {requiredRole: 'menadzer'}},
  {path:'dodaj_pregled_menadzer/:specijalizacija', component:DodajNoviPregledMenadzerComponent, canActivate: [AuthGuard], data: {requiredRole: 'menadzer'}},
  {path:"azuriraj_pregled_menadzer/:idP", component:AzurirajPregledMenadzerComponent, canActivate: [AuthGuard], data: {requiredRole: 'menadzer'}},
  {path:"azuriraj_profil_pacijent/:kor_ime", component:AzurirajProfilPacijentComponent, canActivate: [AuthGuard], data: {requiredRole: 'pacijent'}},
  {path:"azuriraj_profil_lekar/:kor_ime", component:AzurirajProfilLekarComponent, canActivate: [AuthGuard], data: {requiredRole: 'lekar'}},
  {path:"lekar_izbor_pregleda", component:LekarIzborPregledaComponent, canActivate: [AuthGuard], data: {requiredRole: 'lekar'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
