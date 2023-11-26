import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-prijava-menadzer',
  templateUrl: './prijava-menadzer.component.html',
  styleUrls: ['./prijava-menadzer.component.css']
})
export class PrijavaMenadzerComponent implements OnInit {

  constructor(private router:Router, private korisnikService:KorisnikService) { }

  ngOnInit(): void {
    localStorage.setItem('jePrijava', 'da');
    localStorage.setItem('jeRegistracija', 'ne')
    localStorage.setItem('menadzerPrijava', 'da');
  }
  kor_ime:string;
  lozinka:string;
  tip:string;
  porukaKorIme:string;
  porukaLozinka:string;
  porukaTip:string;
  poruka:string;
  
  prijava(){
    this.porukaKorIme="";
    this.porukaLozinka="";
    this.porukaTip="";
    this.poruka="";
    if(this.kor_ime==null){
      this.porukaKorIme="Obavezno polje, morate uneti korisicko ime";
    }
    if(this.lozinka==null){
      this.porukaLozinka="Obavezno polje, morate uneti lozinku"
    }
    this.korisnikService.prijava(this.kor_ime).subscribe((korisnik:Korisnik)=>{
      if(korisnik){
        if(korisnik.lozinka==this.lozinka){
        localStorage.setItem("korisnik", JSON.stringify(korisnik));
        localStorage.setItem('jeUlogovan', 'da');
        localStorage.setItem('jeAnonimni', 'ne')
        if(korisnik.tip=="menadzer"){
          this.router.navigate(['menadzer'])
        }
        else{
         this.poruka="Ovo je forma za logovanje menadzera!"
        }
      }
      else{
        this.poruka="Uneli ste pogresnu lozinku!"
      }
    }
        else{
          this.poruka="Korisnik sa unetim kredencijalima ne postoji u sistemu!"
        }
      
    })
  
    
  }
}
