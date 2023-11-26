import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LekarService } from '../lekar.service';
import { KorisnikService } from '../korisnik.service';
import { ZakazaniPregledService } from '../zakazani-pregled.service';
import { Korisnik } from '../models/korisnik';
import { ZakazaniPregled } from '../models/zakazani_pregled';
import { Lekar } from '../models/lekar';

@Component({
  selector: 'app-azuriraj-profil-lekar',
  templateUrl: './azuriraj-profil-lekar.component.html',
  styleUrls: ['./azuriraj-profil-lekar.component.css']
})
export class AzurirajProfilLekarComponent implements OnInit {

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private lekarService:LekarService,
    private korisnikService:KorisnikService, private zakazani_pregledService:ZakazaniPregledService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    this.kor_ime_lekara=this.activatedRoute.snapshot.paramMap.get('kor_ime')
    this.lekarService.dohvatiLekaraKorIme(this.kor_ime_lekara).subscribe((l:Lekar)=>{
      this.lekar=l;
    })
    this.novo_kor_ime="";
this.lozinka="";
this.kontakt_telefon="";
this.email="";
this.ime="";
this.prezime="";
this.slika="";
this.adresa=""
this.br_lek_licence=""
this.specijalizacija=""
this.staro_kor_ime=this.lekar.kor_ime;
  }
  novo_kor_ime:string;
  lozinka:string;
  kontakt_telefon:string;
  email:string;
  ime:string;
  prezime:string;
  slika:string;
  korisnik:Korisnik;
  kor_ime_lekara:string;
  lekar:Lekar;
  poruka:string;
  slikaFile:File;
  staro_kor_ime:string;
  adresa:string
  br_lek_licence:string;
  specijalizacija:string
  
  
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
          this.korisnikService.azurirajKorIme(this.lekar.kor_ime, this.novo_kor_ime).subscribe(res=>{
            if(res['poruka']=='ok') {}
          })
          this.lekarService.azurirajKorIme(this.lekar.kor_ime,this.novo_kor_ime).subscribe(res=>{
            if(res['poruka']=='ok'){}
          })
          this.lekarService.azurirajKorImeLekariPregledi(this.lekar.kor_ime, this.novo_kor_ime).subscribe(res=>{
            if(res['poruka']=='ok'){}
          })
          
          this.zakazani_pregledService.dohvatiSvePregledeLekara(this.lekar.kor_ime).subscribe((data:ZakazaniPregled[])=>{
            data.forEach(element => {
              this.zakazani_pregledService.azurirajPacijenta(element.idZP, this.novo_kor_ime).subscribe(res=>{
                if(res['poruka']=='ok'){}
              })
            });
          })
          this.lekar.kor_ime=this.novo_kor_ime;
        }
        if(this.korisnik.tip=="lekar"){
         this.lekar.kor_ime=this.novo_kor_ime
          this.korisnik.kor_ime=this.novo_kor_ime;
        }
      })
    
    }
    if(this.lozinka!=""){
      this.lekarService.azurirajLozinku(this.lekar.kor_ime, this.lozinka).subscribe(res=>{
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
      this.lekarService.azurirajIme(this.lekar.kor_ime, this.ime).subscribe(res=>{
        if(res['poruka']!='ok'){
            console.log(res['poruka'])
        }
      })
    }
    if(this.prezime!=""){
      this.lekarService.azurirajPrezime(this.lekar.kor_ime, this.prezime).subscribe(res=>{
        if(res['poruka']!='ok'){
            console.log(res['poruka'])
        }
      })
    }
    if(this.adresa!=""){
      this.lekarService.azurirajAdresu(this.lekar.kor_ime, this.adresa).subscribe(res=>{
        if(res['poruka']!='ok'){
            console.log(res['poruka'])
        }
      })
    }
  
    if(this.kontakt_telefon!=""){
      this.lekarService.azurirajKontaktTelefont(this.lekar.kor_ime, this.kontakt_telefon).subscribe(res=>{
        if(res['poruka']!='ok'){
            console.log(res['poruka'])
        }
      })
    }
    if(this.br_lek_licence!=""){
      this.lekarService.azurirajBrLekLicence(this.lekar.kor_ime, this.br_lek_licence).subscribe(res=>{
        if(res['poruka']!='ok'){
            console.log(res['poruka'])
        }
      })
    }
    if(this.specijalizacija!=""){
      this.lekarService.azurirajSpecijalizaciju(this.lekar.kor_ime, this.specijalizacija).subscribe(res=>{
        if(res['poruka']!='ok'){
            console.log(res['poruka'])
        }
      })
    }
    if(this.slika!=""){
      this.lekarService.azurirajSliku(this.lekar.kor_ime, this.slika).subscribe(res=>{
        if(res['poruka']!='ok'){
            console.log(res['poruka'])
        }
      })
    }
    //if(this.korisnik.tip=='klijent'){
      //this.router.navigate(['klijent'])
    //}
    //else{
      this.router.navigate(['lekar'])
    //}
  }
}
