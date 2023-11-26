import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { LekarService } from '../lekar.service';
import { Specijalizacija } from '../models/specijalizacija';
import { Korisnik } from '../models/korisnik';
import { Lekar } from '../models/lekar';
import { ZahtevService } from '../zahtev.service';
import { ZahtevRegistracija } from '../models/zahtev_registracija';

@Component({
  selector: 'app-novi-lekar',
  templateUrl: './novi-lekar.component.html',
  styleUrls: ['./novi-lekar.component.css']
})
export class NoviLekarComponent implements OnInit {

  constructor(private router:Router, private korisnikService:KorisnikService, private lekarService:LekarService, 
    private zahtevService:ZahtevService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    this.lekarService.dohvatiSveSpecijalizacije().subscribe((data:Specijalizacija[])=>{
      this.specijalizacije=data
    })
    this.kor_ime="";
    this.lozinka="";
    this.lozinka_potvrda="";
    this.kontakt_telefon="";
    this.email="";
    this.ime="";
    this.prezime="";
    this.adresa="";
    this.poruka="";
    this.slika="";
    this.br_lek_licence=""
    this.specijalizacija=""
    this.ogranak_ordinacije=""
  }
  kor_ime:string;
  lozinka:string;
  lozinka_potvrda:string;
  kontakt_telefon:string;
  email:string;
  ime:string;
  prezime:string;
  adresa:string;
  slika:string;
  slikaFile:File;
  poruka:string;
  poruka_slika:string;
  br_lek_licence:string;
  specijalizacija:string;
  ogranak_ordinacije:string
specijalizacije:Specijalizacija[]
  korisnik:Korisnik
  ucitaj(event){
    this.slikaFile=event.target.files[0];
    let slikaUcitana = new Image()
    slikaUcitana.src = window.URL.createObjectURL(this.slikaFile)
    slikaUcitana.onload = ()=>{
      if(slikaUcitana.width > 300 || slikaUcitana.height >300 ||
        slikaUcitana.width < 100 || slikaUcitana.height < 100){
          this.poruka_slika = "Dimenzije slike moraju biti minimalno 100x100, a maksimalno 300x300"
          return;
        }
    }
    this.slika=this.slikaFile.name;
  }
  
  ucitajSliku(){
  this.korisnikService.ucitajSliku(this.slikaFile).subscribe(res=>{
    if(res['poruka']=='ok'){
      
    }
  })
  }

  dodaj(){
    if(this.kor_ime == ""){
      this.poruka = "Morate uneti korisnicko ime";
      return;
    }
  
    if(this.lozinka == ""){
      this.poruka = "Morate uneti lozniku";
      return
    }
  
    if(this.ime == ""){
      this.poruka = "Morate uneti ime"
      return
    }
  
    if(this.prezime == ""){
      this.poruka == "Morate uneti prezime"
      return
    }
  
    if(this.adresa == ""){
      this.poruka ="Morate uneti adresu"
      return
    }
  
    if(this.kontakt_telefon == ""){
      this.poruka = "Morate uneti kontakt telefon"
      return
    }

    if(this.br_lek_licence == ""){
      this.poruka = "Morate uneti broj lekarske licence"
      return
    }

    if(this.specijalizacija == ""){
      this.poruka = "Morate izabrati specijalizaciju"
      return
    }

    if(this.ogranak_ordinacije == ""){
      this.poruka = "Morate uneti ogranak ordinacije u kom lekar radi"
      return
    }
  
    if(this.email == ""){
      this.poruka = "Morate uneti email"
      return
    }
  
    let regexLozinka:RegExp = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{8,16}$/;
    let regexEmail:RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    this.korisnikService.dohvatiKorisnikaKorIme(this.kor_ime).subscribe((korisnik:Korisnik)=>{
      if(korisnik){
        this.poruka = "Korisnicko ime vec postoji u sistemu"
        return
      }
    
      this.lekarService.dohvatiLekaraEmail(this.email).subscribe((lekar:Lekar)=>{
        if(lekar){
          this.poruka = "Nalog sa zadatim email-om vec postoji u sistemu"
          return
        }
      })
      
      this.zahtevService.dohvatiOdbijenZahtevEmail(this.email).subscribe((zahtev:ZahtevRegistracija)=>{
        if(zahtev){
          this.poruka = "Zahtev sa zadatim email-om je vec odbijen"
          return
        }
      })
  
      this.zahtevService.dohvatiOdbijenZahtevKorIme(this.kor_ime).subscribe((zahtev:ZahtevRegistracija)=>{
        if(zahtev){
          this.poruka = "Zahtev sa zadatim korisnickim imenom je vec odbijen"
          return
        }
      })
  
      if(!regexLozinka.test(this.lozinka)){
        this.poruka = "Lozinka nije u dobrom formatu"
        return
      }
  
      for(let i = 0; i<this.lozinka.length; i++){
        if(this.lozinka[i] == this.lozinka[i+1]){
          this.poruka = "Susedni znaci u lozinci ne smeju biti isti"
          return
        }
      }
  
      if(!regexEmail.test(this.email)){
        this.poruka = "Email nije u odgovarajucem formatu"
        return
      }
  
      if(this.slika == ""){
        this.slika="genericka.png"
      }
      this.lekarService.dodajLekara(this.kor_ime, this.lozinka, this.ime, this.prezime,this.adresa, this.kontakt_telefon,this.br_lek_licence, this.specijalizacija, this.ogranak_ordinacije ,this.email, this.slika).subscribe(res=>{
        if(res['poruka']=='lekar je dodat'){
          this.korisnikService.dodajKorisnika(this.kor_ime, this.lozinka, "lekar").subscribe(res=>{
            if(res['poruka']=='korisnik je dodat'){
              this.router.navigate(['novi_lekar']);
              this.kor_ime="";
    this.lozinka="";
    this.lozinka_potvrda="";
    this.kontakt_telefon="";
    this.email="";
    this.ime="";
    this.prezime="";
    this.adresa="";
    this.poruka="";
    this.slika="";
    this.br_lek_licence=""
    this.specijalizacija=""
    this.ogranak_ordinacije=""
            }
          })
          
        }
      })
    })
  
  }
}
