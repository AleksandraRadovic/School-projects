import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZahtevService } from '../zahtev.service';
import { ZahtevRegistracija } from '../models/zahtev_registracija';
import { KorisnikService } from '../korisnik.service';
import { PacijentService } from '../pacijent.service';

@Component({
  selector: 'app-zahtevi-registracija',
  templateUrl: './zahtevi-registracija.component.html',
  styleUrls: ['./zahtevi-registracija.component.css']
})
export class ZahteviRegistracijaComponent implements OnInit {

  constructor(private router:Router, private zahtevService:ZahtevService, private korisnikService:KorisnikService,
    private pacijentService:PacijentService) { }

  ngOnInit(): void {
    this.zahtevService.dohvatiSveZahteveZaRegistraciju().subscribe((data:ZahtevRegistracija[])=>{
      this.zahteviRegistracija=data
    })
  }
zahteviRegistracija:ZahtevRegistracija[]

odbij(kor_ime){
this.zahtevService.odbijZahtev(kor_ime).subscribe(res=>{
  if(res['poruka']=='ok'){}
  this.zahtevService.dohvatiSveZahteveZaRegistraciju().subscribe((data:ZahtevRegistracija[])=>{
    this.zahteviRegistracija=data
  })
})
}

prihvati(kor_ime, lozinka, ime, prezime, adresa, kontakt_telefon, email, slika){
  
  this.zahtevService.prihvatiZahtev(kor_ime).subscribe(res=>{
    if(res['poruka']=='ok'){
      this.korisnikService.dodajKorisnika(kor_ime, lozinka, "pacijent").subscribe(res=>{
        if(res['poruka']=="korisnik je dodat"){}
        this.pacijentService.dodajPacijenta(kor_ime, lozinka, ime, prezime, adresa, kontakt_telefon, email, slika).subscribe(res=>{
          if(res['poruka']=='ok'){}
          this.zahtevService.dohvatiSveZahteveZaRegistraciju().subscribe((data:ZahtevRegistracija[])=>{
            this.zahteviRegistracija=data
          })
        })
      })
    }
  })
}
}
