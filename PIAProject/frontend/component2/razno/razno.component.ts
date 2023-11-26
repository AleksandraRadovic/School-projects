import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PregledService } from '../pregled.service';
import { Korisnik } from '../models/korisnik';
import { Pregled } from '../models/pregled';
import { Lekar } from '../models/lekar';
import { LekarService } from '../lekar.service';

@Component({
  selector: 'app-razno',
  templateUrl: './razno.component.html',
  styleUrls: ['./razno.component.css']
})
export class RaznoComponent implements OnInit {

  constructor(private router:Router, private pregledService:PregledService,
    private lekarService:LekarService) { }

  ngOnInit(): void {
this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
this.lekarService.dohvatiLekaraKorIme(this.korisnik.kor_ime).subscribe((l:Lekar)=>{
  this.lekar=l
})
this.naziv=""
this.trajanje=30
this.cena=""
this.poruka=""
  }
naziv:string;
trajanje:number;
cena:string;
poruka:string;
korisnik:Korisnik
lekar:Lekar
posalji(){
  if(this.naziv=="" || this.cena==""){
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
     this.pregledService.dodajNoviPregled(id, this.lekar.specijalizacija, this.naziv, this.trajanje, this.cena).subscribe(res=>{
      if(res['poruka']=='pregled je dodat'){
      this.router.navigate(['razno'])
      this.naziv=""
this.trajanje=30
this.cena=""
      }
     })
  })
  }
}
}
