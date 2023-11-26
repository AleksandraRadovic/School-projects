import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LekarService } from '../lekar.service';
import { PregledService } from '../pregled.service';
import { Pregled } from '../models/pregled';
import { Korisnik } from '../models/korisnik';
import { LekariPregledi } from '../models/lekari_pregledi';
import { Lekar } from '../models/lekar';

@Component({
  selector: 'app-lekar-izbor-pregleda',
  templateUrl: './lekar-izbor-pregleda.component.html',
  styleUrls: ['./lekar-izbor-pregleda.component.css']
})
export class LekarIzborPregledaComponent implements OnInit {

  constructor(private router:Router, private lekarService:LekarService, private pregledService:PregledService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    this.lekarService.dohvatiLekaraKorIme(this.korisnik.kor_ime).subscribe((l:Lekar)=>{
      this.lekar=l;
      this.pregledService.dohvatiPregledeLekara(this.lekar.specijalizacija).subscribe((p:Pregled[])=>{
        this.sviPregledi=p
        for(let i=0;i<this.sviPregledi.length;i++){
          this.sviPregledi[i].chekiranPregled=false;
        }
      })
    })
    this.lekarService.dohvatiMojeIzabranePreglede(this.korisnik.kor_ime).subscribe((data:LekariPregledi[])=>{
      this.mojiIzabraniPregledi=[]
      for(let i = 0; i<data.length;i++){
  this.pregledService.dohvatiPregledIdP(data[i].IDp).subscribe((p:Pregled)=>{
    this.mojiIzabraniPregledi.push(p);
  })
        
      }   
    })
   

  }
mojiIzabraniPregledi:Pregled[]
mojiNeizabraniPregledi:Pregled[]
sviPregledi:Pregled[];
korisnik:Korisnik
lekar:Lekar

potvrdi(){
  this.lekarService.izbaciMojeVrstePregleda(this.korisnik.kor_ime).subscribe(res=>{
    if(res['poruka']=='ok'){}
  })
  for(let i=0;i<this.sviPregledi.length;i++){
    if(this.sviPregledi[i].chekiranPregled==true){
      this.lekarService.ubaciMojeVrstePregleda(this.korisnik.kor_ime, this.sviPregledi[i].idP).subscribe(res=>{
        if(res['poruka']=='pregled za lekara je dodat'){}
      })
    }
  }
  this.lekarService.dohvatiLekaraKorIme(this.korisnik.kor_ime).subscribe((l:Lekar)=>{
    this.lekar=l;
    this.pregledService.dohvatiPregledeLekara(this.lekar.specijalizacija).subscribe((p:Pregled[])=>{
      this.sviPregledi=p
      for(let i=0;i<this.sviPregledi.length;i++){
        this.sviPregledi[i].chekiranPregled=false;
      }
    })
  })
  this.lekarService.dohvatiMojeIzabranePreglede(this.korisnik.kor_ime).subscribe((data:LekariPregledi[])=>{
    this.mojiIzabraniPregledi=[]
    for(let i = 0; i<data.length;i++){
this.pregledService.dohvatiPregledIdP(data[i].IDp).subscribe((p:Pregled)=>{
  this.mojiIzabraniPregledi.push(p);
})
      
    }   
  })
}
}