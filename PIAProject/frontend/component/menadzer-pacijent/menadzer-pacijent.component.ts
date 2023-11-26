import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacijentService } from '../pacijent.service';
import { Pacijent } from '../models/pacijent';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-menadzer-pacijent',
  templateUrl: './menadzer-pacijent.component.html',
  styleUrls: ['./menadzer-pacijent.component.css']
})
export class MenadzerPacijentComponent implements OnInit {

  constructor(private router:Router, private pacijentService:PacijentService, private korisnikService:KorisnikService ) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    this.pacijentService.dohvatiSvePacijente().subscribe((data:Pacijent[])=>{
      this.sviPacijenti = data
    })
  }
sviPacijenti:Pacijent[]
korisnik:Korisnik
azuriraj(kor_ime){
  this.router.navigate(['azuriraj_pacijenta_menadzer/'+kor_ime])
}
obrisi(kor_ime){
  this.pacijentService.obrisiPacijenta(kor_ime).subscribe(res=>{
    if(res['poruka']=='ok'){
    }
    this.korisnikService.obrisiKorisnika(kor_ime).subscribe(res=>{
      if(res['poruka']=='ok'){
      }
    })
    this.pacijentService.dohvatiSvePacijente().subscribe((data:Pacijent[])=>{
      this.sviPacijenti=data;
    })
  })
}
}
