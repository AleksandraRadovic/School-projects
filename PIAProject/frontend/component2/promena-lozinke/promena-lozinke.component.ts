import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { PacijentService } from '../pacijent.service';
import { LekarService } from '../lekar.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private router:Router, private korisnikSerivce:KorisnikService, private pacijentService:PacijentService,
    private lekarService:LekarService) { }

  ngOnInit(): void {
    this.staraLozinka="";
    this.novaLozinka="";
    this.potvrdaLozinke="";
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'));
  }

  staraLozinka:string;
  novaLozinka:string;
  potvrdaLozinke:string;
  poruka:string;
  korisnik:Korisnik;

  promeni(){
    //let regexLozinka:RegExp = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{8,16}$/;

    if(this.staraLozinka=="" || this.novaLozinka=="" || this.potvrdaLozinke==""){
      this.poruka="Morate popuniti sva polja!"
      return
    }
    else if(this.korisnik.lozinka!=this.staraLozinka){
      this.poruka="Niste dobro uneli staru lozinku!"
      return
    }
    else if(this.novaLozinka!=this.potvrdaLozinke){
      this.poruka="Niste dobro potvrdili lozinku"
      return
    }
    else if(this.staraLozinka==this.novaLozinka){
      this.poruka="Nova i stara lozinka su iste, morate uneti novu lozinku!"
      return
    }
    /*else if(!regexLozinka.test(this.novaLozinka)){
      this.poruka = "Lozinka nije u dobrom formatu"
      return
    }*/
    else{
      for(let i = 0; i<this.novaLozinka.length; i++){
        if(this.novaLozinka[i] == this.novaLozinka[i+1]){
          this.poruka = "Susedni znaci u lozinci ne smeju biti isti"
          return
        }
      }
      if(this.korisnik.tip=="pacijent"){
        this.pacijentService.promeniLozinkuPacijentu(this.korisnik.kor_ime, this.novaLozinka).subscribe((poruka:any)=>{
          console.log(poruka);
        })
      }
      else if(this.korisnik.tip=="lekar"){
        this.lekarService.promeniLozinkuLekaru(this.korisnik.kor_ime, this.novaLozinka).subscribe((poruka:any)=>{
          console.log(poruka)
        })
      }
      this.korisnikSerivce.promeniLozinku(this.korisnik.kor_ime, this.novaLozinka).subscribe((poruka:any)=>{
        localStorage.removeItem('korisnik');
        this.router.navigate(['prijava'])
      })
    }
  }
}
