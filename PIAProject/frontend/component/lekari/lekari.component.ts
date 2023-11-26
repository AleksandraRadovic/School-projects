import { Component, OnInit } from '@angular/core';
import { LekarService } from '../lekar.service';
import { Router } from '@angular/router';
import { Lekar } from '../models/lekar';
import { Specijalizacija } from '../models/specijalizacija';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-lekari',
  templateUrl: './lekari.component.html',
  styleUrls: ['./lekari.component.css']
})
export class LekariComponent implements OnInit {

  constructor(private router:Router, private lekarService:LekarService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    this.lekarService.dohvatiSveLekare().subscribe((data:Lekar[])=>{
      this.sviLekari=data
    })
    this.parametarIme=""
this.parametarPrezime=""
this.parametarSpecijalizacija=""
this.parametarOgranka=""
this.pretrazeniLekari=[]
  }
  sviLekari:Lekar[]
  parametarIme:string
  parametarPrezime:string
  parametarSpecijalizacija:string
  parametarOgranka:string
  pretrazeniLekari:Lekar[]
  porukaPretrage:string
  korisnik:Korisnik
  anonimni:string
  sortirajImeRastuce(){
    this.sviLekari.sort((a,b)=> a.ime.localeCompare(b.ime))
  }
  
  sortirajImeOpadajuce(){
    this.sviLekari.sort((a,b)=> b.ime.localeCompare(a.ime))
  }
  
  sortirajPreizmeRastuce(){
    this.sviLekari.sort((a,b)=> a.prezime.localeCompare(b.prezime))
  }
  sortirajPrezimeOpadajuce(){
    this.sviLekari.sort((a,b)=> b.prezime.localeCompare(a.prezime))
  }
  
  sortirajSpecijalizacijuRastuce(){
    this.sviLekari.sort((a,b)=> a.specijalizacija.localeCompare(b.specijalizacija))
  }
  
  sortirajSpecijalizacijuOpadajuce(){
    this.sviLekari.sort((a,b)=> b.specijalizacija.localeCompare(a.specijalizacija))
  }

  sortirajOgranakRastuce(){
    this.sviLekari.sort((a,b)=> a.ogranak_ordinacije.localeCompare(b.ogranak_ordinacije))
  }
  
  sortirajOgranakOpadajuce(){
    this.sviLekari.sort((a,b)=> b.ogranak_ordinacije.localeCompare(a.ogranak_ordinacije))
  }

  pretrazi(){
    if(this.parametarIme != "" && this.parametarPrezime=="" && this.parametarSpecijalizacija=="" && this.parametarOgranka ==""){
      this.pretrazeniLekari = this.sviLekari.filter(l=>{
        return l.ime.includes(this.parametarIme);
      })
    }
    else if(this.parametarIme == "" && this.parametarPrezime!="" && this.parametarSpecijalizacija=="" && this.parametarOgranka ==""){
      this.pretrazeniLekari = this.sviLekari.filter(l=>{
        return l.prezime.includes(this.parametarPrezime);
      })
    }
    else if(this.parametarIme == "" && this.parametarPrezime=="" && this.parametarSpecijalizacija!="" && this.parametarOgranka ==""){
      this.pretrazeniLekari = this.sviLekari.filter(l=>{
        return l.specijalizacija.includes(this.parametarSpecijalizacija);
      })
    }
    else if(this.parametarIme == "" && this.parametarPrezime=="" && this.parametarSpecijalizacija=="" && this.parametarOgranka !=""){
      this.pretrazeniLekari = this.sviLekari.filter(l=>{
        return l.ogranak_ordinacije.includes(this.parametarOgranka) ;
      })
    }
    else if(this.parametarIme != "" && this.parametarPrezime!="" && this.parametarSpecijalizacija=="" && this.parametarOgranka ==""){
      this.pretrazeniLekari = this.sviLekari.filter(l=>{
        return l.ime.includes(this.parametarIme) || l.prezime.includes(this.parametarPrezime); 
      })
    }
    else if(this.parametarIme != "" && this.parametarPrezime=="" && this.parametarSpecijalizacija!="" && this.parametarOgranka ==""){
      this.pretrazeniLekari = this.sviLekari.filter(l=>{
        return l.ime.includes(this.parametarIme) || l.specijalizacija.includes(this.parametarSpecijalizacija);
      })
    }
    else if(this.parametarIme == "" && this.parametarPrezime!="" && this.parametarSpecijalizacija!="" && this.parametarOgranka ==""){
      this.pretrazeniLekari = this.sviLekari.filter(l=>{
        return l.prezime.includes(this.parametarPrezime) || l.specijalizacija.includes(this.parametarSpecijalizacija);
      })
    }
    else if(this.parametarIme != "" && this.parametarPrezime=="" && this.parametarSpecijalizacija=="" && this.parametarOgranka !=""){
      this.pretrazeniLekari = this.sviLekari.filter(l=>{
        return l.prezime.includes(this.parametarIme) || l.ogranak_ordinacije.includes(this.parametarOgranka);
      })
    }
    else if(this.parametarIme == "" && this.parametarPrezime!="" && this.parametarSpecijalizacija=="" && this.parametarOgranka !=""){
      this.pretrazeniLekari = this.sviLekari.filter(l=>{
        return l.prezime.includes(this.parametarPrezime) || l.ogranak_ordinacije.includes(this.parametarOgranka);
      })
    }
    else if(this.parametarIme == "" && this.parametarPrezime=="" && this.parametarSpecijalizacija!="" && this.parametarOgranka !=""){
      this.pretrazeniLekari = this.sviLekari.filter(l=>{
        return l.specijalizacija.includes(this.parametarSpecijalizacija) || l.ogranak_ordinacije.includes(this.parametarOgranka);
      })
    }
    else if(this.parametarIme != "" && this.parametarPrezime!="" && this.parametarSpecijalizacija!="" && this.parametarOgranka ==""){
      this.pretrazeniLekari = this.sviLekari.filter(l=>{
        return l.ime.includes(this.parametarIme) || l.prezime.includes(this.parametarPrezime) || l.specijalizacija.includes(this.parametarSpecijalizacija);
      })
    }
    else if(this.parametarIme != "" && this.parametarPrezime!="" && this.parametarSpecijalizacija=="" && this.parametarOgranka !=""){
      this.pretrazeniLekari = this.sviLekari.filter(l=>{
        return l.ime.includes(this.parametarIme) || l.prezime.includes(this.parametarPrezime) || l.ogranak_ordinacije.includes(this.parametarOgranka);
      })
    }
    else if(this.parametarIme == "" && this.parametarPrezime!="" && this.parametarSpecijalizacija!="" && this.parametarOgranka !=""){
      this.pretrazeniLekari = this.sviLekari.filter(l=>{
        return l.prezime.includes(this.parametarPrezime) || l.specijalizacija.includes(this.parametarSpecijalizacija) || l.ogranak_ordinacije.includes(this.parametarOgranka);
      })
    }
    else if(this.parametarIme != "" && this.parametarPrezime!="" && this.parametarSpecijalizacija!="" && this.parametarOgranka !=""){
      this.pretrazeniLekari = this.sviLekari.filter(l=>{
        return  l.ime.includes(this.parametarIme) || l.prezime.includes(this.parametarPrezime) || l.specijalizacija.includes(this.parametarSpecijalizacija) || l.ogranak_ordinacije.includes(this.parametarOgranka);
      })
    }
    else this.porukaPretrage = "Morate uneti neki ili sve parametre za pretragu"
  }
}
