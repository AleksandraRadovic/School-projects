import { Component, OnInit } from '@angular/core';
import { Pacijent } from '../models/pacijent';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';
import { PacijentService } from '../pacijent.service';

@Component({
  selector: 'app-profil-pacijent',
  templateUrl: './profil-pacijent.component.html',
  styleUrls: ['./profil-pacijent.component.css']
})
export class ProfilPacijentComponent implements OnInit {

  constructor(private router:Router, private pacijentService:PacijentService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    this.pacijentService.dohvatiPacijentaKorIme(this.korisnik.kor_ime).subscribe((data:Pacijent)=>{
      this.pacijent=data;
    })
  }
  pacijent:Pacijent;
  korisnik:Korisnik;
  azuriraj(kor_ime){
    this.router.navigate(['azuriraj_profil_pacijent/'+kor_ime])
  }
}
