import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LekarService } from '../lekar.service';
import { Specijalizacija } from '../models/specijalizacija';
import { PregledService } from '../pregled.service';
import { Pregled } from '../models/pregled';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-specijalizacije-pregledi',
  templateUrl: './specijalizacije-pregledi.component.html',
  styleUrls: ['./specijalizacije-pregledi.component.css']
})
export class SpecijalizacijePreglediComponent implements OnInit {

  constructor(private router:Router, private lekarService:LekarService, private pregledService:PregledService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    this.lekarService.dohvatiSveSpecijalizacije().subscribe((data:Specijalizacija[])=>{
      this.sveSpecijalizacije=data
      this.sveSpecijalizacije.forEach(element => {
        element.pregledi=[]
        this.pregledService.dohvatiPregledeLekara(element.naziv).subscribe((pregled:Pregled[])=>{
          for(let i=0;i<pregled.length;i++){
            element.pregledi.push(pregled[i]);
          }
        })
        
    })
    })
    this.novaSpecijalizacija=false;
  }
sveSpecijalizacije:Specijalizacija[]
novaSpecijalizacija:boolean
naziv:string

korisnik:Korisnik
azuriraj(idP){
this.router.navigate(['azuriraj_pregled_menadzer/'+idP])
}

obrisi(idP){
this.pregledService.odbijPregled(idP).subscribe(res=>{
  if(res['poruka']=='ok'){
    this.lekarService.dohvatiSveSpecijalizacije().subscribe((data:Specijalizacija[])=>{
      this.sveSpecijalizacije=data
      this.sveSpecijalizacije.forEach(element => {
        element.pregledi=[]
        this.pregledService.dohvatiPregledeLekara(element.naziv).subscribe((pregled:Pregled[])=>{
          for(let i=0;i<pregled.length;i++){
            element.pregledi.push(pregled[i]);
          }
        })
        
    })
    })
  }
})
}

dodaj(specijalizacija){
this.router.navigate(['dodaj_pregled_menadzer/'+specijalizacija])
}

potvrdi(){
  this.lekarService.dodajSpecijalizaciju(this.naziv).subscribe(res=>{
    if(res['poruka']=='specijalizacija je dodata'){
      this.novaSpecijalizacija=false;
      this.lekarService.dohvatiSveSpecijalizacije().subscribe((data:Specijalizacija[])=>{
        this.sveSpecijalizacije=data
        this.sveSpecijalizacije.forEach(element => {
          element.pregledi=[]
          this.pregledService.dohvatiPregledeLekara(element.naziv).subscribe((pregled:Pregled[])=>{
            for(let i=0;i<pregled.length;i++){
              element.pregledi.push(pregled[i]);
            }
          })
          
      })
      })
    }
  })
      
    }
  


dodaj_specijalizaciju(){
this.novaSpecijalizacija=true
}
}
