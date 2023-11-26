import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { PacijentPreglediComponent } from '../pacijent-pregledi/pacijent-pregledi.component';
import { Pacijent } from '../models/pacijent';
import { PacijentService } from '../pacijent.service';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css']
})
export class PacijentComponent implements OnInit {

  constructor(private router:Router, private pacijentService:PacijentService) { }

  ngOnInit(): void {
    localStorage.setItem('tipKorisnika', 'pacijent')
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    this.pacijentService.dohvatiPacijentaKorIme(this.korisnik.kor_ime).subscribe((p:Pacijent)=>{
      this.pacijent=p
    })
  }
korisnik:Korisnik;
pacijent:Pacijent
}
