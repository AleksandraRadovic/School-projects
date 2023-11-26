import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PregledService } from '../pregled.service';
import { Pregled } from '../models/pregled';
import { Lekar } from '../models/lekar';
import { LekarService } from '../lekar.service';
import { Specijalizacija } from '../models/specijalizacija';
import { LekariPregledi } from '../models/lekari_pregledi';
import { Pacijent } from '../models/pacijent';
import { Korisnik } from '../models/korisnik';
import { PacijentService } from '../pacijent.service';
import { ZakazaniPregledService } from '../zakazani-pregled.service';
import { ZakazaniPregled } from '../models/zakazani_pregled';
import { min } from 'rxjs';

@Component({
  selector: 'app-profil-lekara-pacijent',
  templateUrl: './profil-lekara-pacijent.component.html',
  styleUrls: ['./profil-lekara-pacijent.component.css']
})
export class ProfilLekaraPacijentComponent implements OnInit {

  constructor(private router:Router, private activatedRoute:ActivatedRoute, 
    private pregledService:PregledService, private lekarService:LekarService, private pacijentService:PacijentService,
    private zakazani_pregledService:ZakazaniPregledService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    
    this.pacijentService.dohvatiPacijentaKorIme(this.korisnik.kor_ime).subscribe((p:Pacijent)=>{
      this.pacijent=p
    })
    this.kor_ime_lekar = this.activatedRoute.snapshot.paramMap.get('kor_ime')
    this.lekarService.dohvatiLekaraKorIme(this.kor_ime_lekar).subscribe((l:Lekar)=>{
      this.lekar = l;
      this.lekarService.dohvatiMojeIzabranePreglede(this.lekar.kor_ime).subscribe((data:LekariPregledi[])=>{
        this.sviPreglediLekara=[]
        for(let i=0;i<data.length;i++){
          this.pregledService.dohvatiPregledIdP(data[i].IDp).subscribe((p:Pregled)=>{
            p.zakazivanje=false
            this.sviPreglediLekara.push(p)
          })
        }
      })
    })
   
this.poruka=''
  }
sviPreglediLekara:Pregled[]
kor_ime_lekar:string
lekar:Lekar
pacijent:Pacijent
vreme:string;
datum:Date
korisnik:Korisnik
pocetakPregleda:number
krajPregleda:number
pocetakMinuti:string
pocetakSati:string
mojiZakazaniPregledi:ZakazaniPregled[]
poruka:string
zakaziPregled(idP){
  for(let i=0;i<this.sviPreglediLekara.length;i++){
    if(this.sviPreglediLekara[i].idP==idP){
      this.sviPreglediLekara[i].zakazivanje=true
    }
  }
}
potvrdi(naziv, idP, trajanje){
  const [sati, minuti] = this.vreme.split(':')
this.pocetakPregleda=parseInt(sati)*60+parseInt(minuti)
this.krajPregleda=parseInt(sati)*60+parseInt(minuti)+trajanje


this.zakazani_pregledService.dohvatiSvePregledeZakazivanja().subscribe((data:ZakazaniPregled[])=>{
  let id=0;
  data.forEach(element => {
    if(id<element.idZP){
      id=element.idZP
    }
  });
 id+=1;
 this.zakazani_pregledService.dodajZakazaniPregled(id, naziv, this.pacijent.kor_ime, this.kor_ime_lekar, this.datum, this.krajPregleda, this.pocetakPregleda, this.vreme).subscribe(res=>{
  if(res['poruka']=='zakazani_pregled je dodat'){
    for(let i=0;i<this.sviPreglediLekara.length;i++){
      if(this.sviPreglediLekara[i].idP==idP){
        this.sviPreglediLekara[i].zakazivanje=false
      }
      this.poruka="Pregled je uspesno zakazan"
    }
  }
 }
  
 )
})
}








}
