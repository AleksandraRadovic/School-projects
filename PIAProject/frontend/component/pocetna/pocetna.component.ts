import { Component, OnInit } from '@angular/core';
import { Lekar } from '../models/lekar';
import { Router } from '@angular/router';
import { LekarService } from '../lekar.service';
import { Specijalizacija } from '../models/specijalizacija';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private router:Router, private lekarService:LekarService) { }

  ngOnInit(): void {
    localStorage.setItem("jeUlogovan", "ne");
    localStorage.setItem("jePrijava", 'ne');
    localStorage.setItem("jeRegistracija", "ne");
    localStorage.setItem("jeAnonimni", "da");
    localStorage.setItem("menadzerPrijava", "ne");


    this.lekarService.dohvatiSveLekare().subscribe((data:Lekar[])=>{
      this.sviLekari=data
      
  })
  this.parametarIme=""
  this.parametarPrezime=""
  this.parametarSpecijalizacija=""
  this.pretrazeniLekari=[]
}
sviLekari:Lekar[]
parametarIme:string
parametarPrezime:string
parametarSpecijalizacija:string
pretrazeniLekari:Lekar[]
porukaPretrage:string

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

pretrazi(){
  if(this.parametarIme != "" && this.parametarPrezime=="" && this.parametarSpecijalizacija==""){
    this.pretrazeniLekari = this.sviLekari.filter(l=>{
      return l.ime.includes(this.parametarIme);
    })
  }
  else if(this.parametarIme == "" && this.parametarPrezime!="" && this.parametarSpecijalizacija==""){
    this.pretrazeniLekari = this.sviLekari.filter(l=>{
      return l.prezime.includes(this.parametarPrezime);
    })
  }
  else if(this.parametarIme == "" && this.parametarPrezime=="" && this.parametarSpecijalizacija!=""){
    this.pretrazeniLekari = this.sviLekari.filter(l=>{
      return l.specijalizacija.includes(this.parametarSpecijalizacija);
    })
  }
  else if(this.parametarIme != "" && this.parametarPrezime!="" && this.parametarSpecijalizacija==""){
    this.pretrazeniLekari = this.sviLekari.filter(l=>{
      return l.ime.includes(this.parametarIme) || l.prezime.includes(this.parametarPrezime); 
    })
  }
  else if(this.parametarIme != "" && this.parametarPrezime=="" && this.parametarSpecijalizacija!=""){
    this.pretrazeniLekari = this.sviLekari.filter(l=>{
      return l.ime.includes(this.parametarIme) || l.specijalizacija.includes(this.parametarSpecijalizacija);
    })
  }
  else if(this.parametarIme == "" && this.parametarPrezime!="" && this.parametarSpecijalizacija!=""){
    this.pretrazeniLekari = this.sviLekari.filter(l=>{
      return l.prezime.includes(this.parametarPrezime) || l.specijalizacija.includes(this.parametarSpecijalizacija);
    })
  }
  else if(this.parametarIme != "" && this.parametarPrezime!="" && this.parametarSpecijalizacija!=""){
    this.pretrazeniLekari = this.sviLekari.filter(l=>{
      return l.ime.includes(this.parametarIme) || l.prezime.includes(this.parametarPrezime) || l.specijalizacija.includes(this.parametarSpecijalizacija);
    })
  }
  else this.porukaPretrage = "Morate uneti neki ili sve parametre za pretragu"
}
}
