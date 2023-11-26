import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IzvestajPacijentaService } from '../izvestaj-pacijenta.service';
import { IzvestajPacijenta } from '../models/izvestaj_pacijenta';
import { Pacijent } from '../models/pacijent';
import { PacijentService } from '../pacijent.service';
import { ZakazaniPregledService } from '../zakazani-pregled.service';
import { LekarService } from '../lekar.service';
import { ZakazaniPregled } from '../models/zakazani_pregled';
import { Lekar } from '../models/lekar';
import { Pregled } from '../models/pregled';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-karton-pacijenta',
  templateUrl: './karton-pacijenta.component.html',
  styleUrls: ['./karton-pacijenta.component.css']
})
export class KartonPacijentaComponent implements OnInit {

  constructor(private router:Router, private izvestaj_pacijentaService:IzvestajPacijentaService, 
    private activatedRoute:ActivatedRoute, private pacijentService:PacijentService,
    private zakazani_pregledService:ZakazaniPregledService, private lekarService:LekarService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
this.kor_ime_pacijenta=this.activatedRoute.snapshot.paramMap.get("kor_ime_pacijent")
this.pacijentService.dohvatiPacijentaKorIme(this.kor_ime_pacijenta).subscribe((p:Pacijent)=>{
  this.pacijent=p
})
this.izvestaj_pacijentaService.dohvatiIzvestajePacijenta(this.kor_ime_pacijenta).subscribe((data:IzvestajPacijenta[])=>{
  this.izvestajiPacijenta=data
  this.izvestajiPacijenta.forEach(element => {
    this.zakazani_pregledService.dohvatiZakazaniPregledId(element.zpID).subscribe((i:ZakazaniPregled)=>{
      element.datum_pregleda=i.datum;
      element.vreme_pregleda=i.vreme
      this.lekarService.dohvatiLekaraKorIme(i.lekar).subscribe((l:Lekar)=>{
        element.lekar_ime = l.ime;
        element.lekar_specijalizacija=l.specijalizacija
      })
    })
})
})
this.zakazani_pregledService.dohvatiSveObavljenePregledeBezIzvestaja(this.kor_ime_pacijenta, this.korisnik.kor_ime).subscribe((data:ZakazaniPregled[])=>{
  this.obavljeniPreglediBezIzvestaja=data
  this.obavljeniPreglediBezIzvestaja.forEach(element => {
    this.pacijentService.dohvatiPacijentaKorIme(element.pacijent).subscribe((p:Pacijent)=>{
      element.pacijent_ime=p.ime;
      element.pacijent_prezime=p.prezime
    })
})
})
  }
kor_ime_pacijenta:string
izvestajiPacijenta:IzvestajPacijenta[]
pacijent:Pacijent
obavljeniPreglediBezIzvestaja:ZakazaniPregled[]
korisnik:Korisnik

napisi_izvestaj(idZP){
  this.router.navigate(['napisi_izvestaj/'+idZP])
}
}
