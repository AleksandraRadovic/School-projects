import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LekarService } from '../lekar.service';
import { Lekar } from '../models/lekar';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-menadzer-lekar',
  templateUrl: './menadzer-lekar.component.html',
  styleUrls: ['./menadzer-lekar.component.css']
})
export class MenadzerLekarComponent implements OnInit {

  constructor(private router:Router, private lekarService:LekarService,
    private korisnikService:KorisnikService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    this.lekarService.dohvatiSveLekare().subscribe((data:Lekar[])=>{
      this.sviLekari=data
    })
  }
sviLekari:Lekar[]
korisnik:Korisnik
azuriraj(kor_ime){
this.router.navigate(['azuriraj_lekara_menadzer/'+kor_ime])
}

obrisi(kor_ime){
  this.lekarService.obrisiLekara(kor_ime).subscribe(res=>{
    if(res['poruka']=='ok'){
    }
    this.korisnikService.obrisiKorisnika(kor_ime).subscribe(res=>{
      if(res['poruka']=='ok'){
      }
    })
    this.lekarService.dohvatiSveLekare().subscribe((data:Lekar[])=>{
      this.sviLekari=data;
    })
  })
}
}
