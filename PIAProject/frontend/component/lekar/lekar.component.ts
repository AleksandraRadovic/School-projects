import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Lekar } from '../models/lekar';
import { Router } from '@angular/router';
import { LekarService } from '../lekar.service';

@Component({
  selector: 'app-lekar',
  templateUrl: './lekar.component.html',
  styleUrls: ['./lekar.component.css']
})
export class LekarComponent implements OnInit {

  constructor(private router:Router, private lekarService:LekarService) { }

  ngOnInit(): void {
    localStorage.setItem('tipKorisnika', 'lekar')
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    this.lekarService.dohvatiLekaraKorIme(this.korisnik.kor_ime).subscribe((l:Lekar)=>{
      this.lekar=l
    })
  }
korisnik:Korisnik
lekar:Lekar
azuriraj(kor_ime){
  this.router.navigate(['azuriraj_profil_lekar/'+kor_ime])
}

izaberi(){
  this.router.navigate(['lekar_izbor_pregleda'])
}
}
