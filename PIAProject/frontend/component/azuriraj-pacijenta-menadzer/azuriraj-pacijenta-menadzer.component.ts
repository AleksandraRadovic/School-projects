import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacijentService } from '../pacijent.service';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Pacijent } from '../models/pacijent';
import { IzvestajPacijentaService } from '../izvestaj-pacijenta.service';
import { ZakazaniPregledService } from '../zakazani-pregled.service';
import { IzvestajPacijenta } from '../models/izvestaj_pacijenta';
import { ZakazaniPregled } from '../models/zakazani_pregled';

@Component({
  selector: 'app-azuriraj-pacijenta-menadzer',
  templateUrl: './azuriraj-pacijenta-menadzer.component.html',
  styleUrls: ['./azuriraj-pacijenta-menadzer.component.css']
})
export class AzurirajPacijentaMenadzerComponent implements OnInit {

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private pacijentService:PacijentService,
    private korisnikService:KorisnikService, private izvestaji_pacijentaService:IzvestajPacijentaService, 
    private zakazani_pregledService:ZakazaniPregledService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    this.kor_ime_pacijenta=this.activatedRoute.snapshot.paramMap.get('kor_ime')
    this.pacijentService.dohvatiPacijentaKorIme(this.kor_ime_pacijenta).subscribe((p:Pacijent)=>{
      this.pacijent=p;
    })
    this.novo_kor_ime="";
this.lozinka="";
this.kontakt_telefon="";
this.email="";
this.ime="";
this.prezime="";
this.slika="";
this.adresa=""
this.staro_kor_ime=this.pacijent.kor_ime;
  }

novo_kor_ime:string;
lozinka:string;
kontakt_telefon:string;
email:string;
ime:string;
prezime:string;
slika:string;
korisnik:Korisnik;
kor_ime_pacijenta:string;
pacijent:Pacijent;
poruka:string;
slikaFile:File;
staro_kor_ime:string;
adresa:string


ucitaj(event){
  this.slikaFile=event.target.files[0];
  this.slika=this.slikaFile.name;
}

ucitajSliku(){
this.korisnikService.ucitajSliku(this.slikaFile).subscribe(res=>{
  if(res['poruka']=='ok'){
    
  }
})
}

azuriraj(){
  if(this.novo_kor_ime!=""){
    this.korisnikService.dohvatiKorisnikaKorIme(this.novo_kor_ime).subscribe((k:Korisnik)=>{
      if(k){
        this.poruka="U sistemu postoji korisnik sa zadatim korisnickim imenom!"
      }
      else{
        //ovde treba da azuriram svugde
        this.korisnikService.azurirajKorIme(this.pacijent.kor_ime, this.novo_kor_ime).subscribe(res=>{
          if(res['poruka']=='ok') {}
        })
        this.pacijentService.azurirajKorIme(this.pacijent.kor_ime,this.novo_kor_ime).subscribe(res=>{
          if(res['poruka']=='ok'){}
        })
        this.izvestaji_pacijentaService.dohvatiIzvestajePacijenta(this.pacijent.kor_ime).subscribe((data:IzvestajPacijenta[])=>{
          data.forEach(element => {
            this.izvestaji_pacijentaService.azurirajPacijenta(element.idI, this.novo_kor_ime).subscribe(res=>{
              if(res['poruka']=='ok'){}
            })
          });
        })
        
        this.zakazani_pregledService.dohvatiSvePregledePacijenta(this.pacijent.kor_ime).subscribe((data:ZakazaniPregled[])=>{
          data.forEach(element => {
            this.zakazani_pregledService.azurirajPacijenta(element.idZP, this.novo_kor_ime).subscribe(res=>{
              if(res['poruka']=='ok'){}
            })
          });
        })
        this.pacijent.kor_ime=this.novo_kor_ime;
      }
      if(this.korisnik.tip=="pacijent"){
       this.pacijent.kor_ime=this.novo_kor_ime
        this.korisnik.kor_ime=this.novo_kor_ime;
      }
    })
  
  }
  if(this.lozinka!=""){
    this.pacijentService.azurirajLozinku(this.pacijent.kor_ime, this.lozinka).subscribe(res=>{
      if(res['poruka']=='ok'){
        if(this.korisnik.tip=="pacijent"){
          this.korisnik.lozinka=this.lozinka
        }
        else {
          console.log(res['poruka'])
        }
      }
    })
    this.korisnikService.promeniLozinku(this.staro_kor_ime, this.lozinka).subscribe(res=>{
      if(res['poruka']=='ok'){}
    })
  }
  if(this.ime!=""){
    this.pacijentService.azurirajIme(this.pacijent.kor_ime, this.ime).subscribe(res=>{
      if(res['poruka']!='ok'){
          console.log(res['poruka'])
      }
    })
  }
  if(this.prezime!=""){
    this.pacijentService.azurirajPrezime(this.pacijent.kor_ime, this.prezime).subscribe(res=>{
      if(res['poruka']!='ok'){
          console.log(res['poruka'])
      }
    })
  }
  if(this.adresa!=""){
    this.pacijentService.azurirajAdresu(this.pacijent.kor_ime, this.adresa).subscribe(res=>{
      if(res['poruka']!='ok'){
          console.log(res['poruka'])
      }
    })
  }

  if(this.kontakt_telefon!=""){
    this.pacijentService.azurirajKontaktTelefont(this.pacijent.kor_ime, this.kontakt_telefon).subscribe(res=>{
      if(res['poruka']!='ok'){
          console.log(res['poruka'])
      }
    })
  }
  if(this.email!=""){
    this.pacijentService.azurirajEmail(this.pacijent.kor_ime, this.email).subscribe(res=>{
      if(res['poruka']!='ok'){
          console.log(res['poruka'])
      }
    })
  }
  if(this.slika!=""){
    this.pacijentService.azurirajSliku(this.pacijent.kor_ime, this.slika).subscribe(res=>{
      if(res['poruka']!='ok'){
          console.log(res['poruka'])
      }
    })
  }
  //if(this.korisnik.tip=='klijent'){
    //this.router.navigate(['klijent'])
  //}
  //else{
    this.router.navigate(['menadzer_pacijent'])
  //}
}
}
