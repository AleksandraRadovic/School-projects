import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PregledService } from '../pregled.service';
import { LekarService } from '../lekar.service';
import { Specijalizacija } from '../models/specijalizacija';
import { Pregled } from '../models/pregled';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-azuriraj-pregled-menadzer',
  templateUrl: './azuriraj-pregled-menadzer.component.html',
  styleUrls: ['./azuriraj-pregled-menadzer.component.css']
})
export class AzurirajPregledMenadzerComponent implements OnInit {

  constructor(private router:Router, private pregledService:PregledService, private lekarService:LekarService,
    private activatedRoute:ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    this.idP=parseInt(this.activatedRoute.snapshot.paramMap.get('idP'))
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
    this.naziv=""
    this.cena=""
    this.poruka=""
  }
naziv:string
cena:string
poruka:string
sveSpecijalizacije:Specijalizacija[]
idP:number
korisnik:Korisnik;
azuriraj(){
  if(this.naziv!=""){
  this.pregledService.azurirajNazivPregleda(this.idP, this.naziv).subscribe(res=>{
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
if(this.cena!=""){
  this.pregledService.azurirajCenuPregleda(this.idP, this.cena).subscribe(res=>{
    if(res['poruka']=='ok'){

    }
  })
}
this.router.navigate(["specijalizacije_pregledi"])
}

}
