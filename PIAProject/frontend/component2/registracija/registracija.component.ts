import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZahtevService } from '../zahtev.service';
import { KorisnikService } from '../korisnik.service';
import { PacijentService } from '../pacijent.service';
import { Korisnik } from '../models/korisnik';
import { Pacijent } from '../models/pacijent';
import { ZahtevRegistracija } from '../models/zahtev_registracija';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private router:Router, private zahtevService:ZahtevService, private korisnikService:KorisnikService,
    private pacijentService:PacijentService) { }

  ngOnInit(): void {
    localStorage.setItem('jePrijava', 'ne');
    localStorage.setItem('jeRegistracija', 'da');
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
  
  onFileSelect(event){
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
  
  registracija(){
  if(this.kor_ime == ""){
    this.poruka = "Morate uneti korisnicko ime";
    return;
  }

  if(this.lozinka == ""){
    this.poruka = "Morate uneti lozniku";
    return
  }

  if(this.lozinka_potvrda == ""){
    this.poruka = "Morate uneti ponovo lozinku"
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
  
    this.pacijentService.dohvatiPacijentaEmail(this.email).subscribe((pacijent:Pacijent)=>{
      if(pacijent){
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

    if(this.lozinka != this.lozinka_potvrda){
      this.poruka = "Lozinke se ne poklapaju"
      return
    }

    if(!regexEmail.test(this.email)){
      this.poruka = "Email nije u odgovarajucem formatu"
      return
    }

    if(this.slika == ""){
      this.slika="genericka.png"
    }
    this.zahtevService.registracijaPacijenta(this.kor_ime, this.lozinka, this.ime, this.prezime, this.kontakt_telefon, this.email, this.adresa, this.slika).subscribe(res=>{
      if(res['poruka']=='zahtev je dodat'){
        localStorage.setItem('jeUlogovan', 'ne');
        this.router.navigate(['']);
      }
    })
  })

  }
  
  
  
}
