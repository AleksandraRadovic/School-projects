import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PregledService } from '../pregled.service';
import { Pregled } from '../models/pregled';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-novi-pregled-zahtev',
  templateUrl: './novi-pregled-zahtev.component.html',
  styleUrls: ['./novi-pregled-zahtev.component.css']
})
export class NoviPregledZahtevComponent implements OnInit {

  constructor(private router:Router, private pregledService:PregledService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    this.pregledService.dohvatiNeobradjenePreglede().subscribe((data:Pregled[])=>{
      this.zahteviNoviPregled=data
    })
  }

  zahteviNoviPregled:Pregled[]
korisnik:Korisnik
odbij(idP){
this.pregledService.odbijPregled(idP).subscribe(res=>{
  if(res['poruka']=='ok'){
    this.pregledService.dohvatiNeobradjenePreglede().subscribe((data:Pregled[])=>{
      this.zahteviNoviPregled=data
    })
  }
})
}
odobri(idP){
  this.pregledService.odobriPregled(idP).subscribe(res=>{
    if(res['poruka']=='ok'){
      this.pregledService.dohvatiNeobradjenePreglede().subscribe((data:Pregled[])=>{
        this.zahteviNoviPregled=data
      })
    }
  })
}
}
