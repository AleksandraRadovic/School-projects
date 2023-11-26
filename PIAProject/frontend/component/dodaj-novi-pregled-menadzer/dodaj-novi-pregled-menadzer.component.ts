import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PregledService } from '../pregled.service';
import { Pregled } from '../models/pregled';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-dodaj-novi-pregled-menadzer',
  templateUrl: './dodaj-novi-pregled-menadzer.component.html',
  styleUrls: ['./dodaj-novi-pregled-menadzer.component.css']
})
export class DodajNoviPregledMenadzerComponent implements OnInit {

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private pregledService:PregledService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    this.specijalizacija=this.activatedRoute.snapshot.paramMap.get('specijalizacija')
    this.naziv=""
this.trajanje=30
this.cena=""
this.poruka=""
  }
  naziv:string
  trajanje:number;
  cena:string;
  poruka:string;
  specijalizacija:string
  korisnik:Korisnik
  
  dodaj(){
    if(this.naziv==""  || this.cena==""){
      this.poruka="Morate uneti sva polja "
    }
    else{
      this.pregledService.dohvatiSvePreglede().subscribe((data:Pregled[])=>{
        let id=0;
        data.forEach(element => {
          if(id<element.idP){
            id=element.idP
          }
        });
       id+=1;
       this.pregledService.dodajNoviPregledMenadzer(id, this.specijalizacija, this.naziv, this.trajanje, this.cena).subscribe(res=>{
        if(res['poruka']=='pregled je dodat'){
        this.router.navigate(['dodaj_pregled_menadzer/'+this.specijalizacija])
        this.naziv=""
        this.trajanje=30
this.cena=""
this.poruka=""
        }
       })
    })
    }
  }
}
