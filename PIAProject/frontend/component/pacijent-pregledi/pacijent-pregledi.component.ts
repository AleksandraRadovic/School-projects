import { Component, OnInit } from '@angular/core';
import { ZakazaniPregled } from '../models/zakazani_pregled';
import { ZakazaniPregledService } from '../zakazani-pregled.service';
import { Route, Router } from '@angular/router';
import { LekarService } from '../lekar.service';
import { Lekar } from '../models/lekar';
import { Korisnik } from '../models/korisnik';
import { IzvestajPacijentaService } from '../izvestaj-pacijenta.service';
import { IzvestajPacijenta } from '../models/izvestaj_pacijenta';

@Component({
  selector: 'app-pacijent-pregledi',
  templateUrl: './pacijent-pregledi.component.html',
  styleUrls: ['./pacijent-pregledi.component.css']
})
export class PacijentPreglediComponent implements OnInit {

  constructor(private router:Router, private zakazani_pregledService:ZakazaniPregledService,
    private lekarService:LekarService, private izvestaj_pacijentaService:IzvestajPacijentaService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    this.zakazani_pregledService.dohvatiZakazanePregledePacijenta(this.korisnik.kor_ime).subscribe((data:ZakazaniPregled[])=>{
      this.zakazaniPregledi=data;
      for(let i=0;i<data.length;i++){
        this.zakazaniPregledi[i].zpDatum=new Date(data[i].datum)
      }
      this.zakazaniPregledi.forEach(element => {
        this.lekarService.dohvatiLekaraKorIme(element.lekar).subscribe((l:Lekar)=>{
          element.lekar_ime=l.ime;
          element.lekar_prezime=l.prezime;
          element.lekar_ogranak=l.ogranak_ordinacije
          
        })
        
    })
    this.zakazaniPregledi=this.sortZakazanePreglede();
  })
  this.izvestaj_pacijentaService.dohvatiIzvestajePacijenta(this.korisnik.kor_ime).subscribe((data:IzvestajPacijenta[])=>{
    this.izvestaji = data
    this.izvestaji.forEach(element => {
      this.zakazani_pregledService.dohvatiZakazaniPregledId(element.zpID).subscribe((i:ZakazaniPregled)=>{
        element.datum_pregleda=i.datum;
        element.vreme_pregleda=i.vreme
        element.datumDate=new Date(i.datum)
        this.lekarService.dohvatiLekaraKorIme(i.lekar).subscribe((l:Lekar)=>{
          element.lekar_ime = l.ime;
          element.lekar_specijalizacija=l.specijalizacija
        })
      })
  })
  this.izvestaji=this.sortIzvestaje();
  })
  }
zakazaniPregledi:ZakazaniPregled[]
izvestaji:IzvestajPacijenta[]
lekar:Lekar
korisnik:Korisnik;

sortZakazanePreglede(): ZakazaniPregled[]{
  let sviZakazaniPregledi = this.zakazaniPregledi;
  return sviZakazaniPregledi.sort((zakazani_pregled1, zakazani_pregled2)=>{

    if(zakazani_pregled1.zpDatum<zakazani_pregled2.zpDatum){
      return -1;
    }
    else{
      if(zakazani_pregled1.zpDatum == zakazani_pregled2.zpDatum){
        return 0;
      }
      else return 1;
    }
  })
}

sortIzvestaje(): IzvestajPacijenta[]{
  let sviIzvestaji = this.izvestaji;
  return sviIzvestaji.sort((izvestaj1, izvestaj2)=>{
    if(izvestaj1.datumDate<izvestaj2.datumDate){
      return 1;
    }
    else{
      if(izvestaj1.datumDate == izvestaj2.datumDate){
        return 0;
      }
      else return -1;
    }
  })
}

otkazi(idZP){
  this.zakazani_pregledService.otkaziPregledId(idZP).subscribe(res=>{
    if(res['poruka']=='ok'){}
    this.zakazani_pregledService.dohvatiZakazanePregledePacijenta(this.korisnik.kor_ime).subscribe((data:ZakazaniPregled[])=>{
      this.zakazaniPregledi=data;
      for(let i=0;i<data.length;i++){
        this.zakazaniPregledi[i].zpDatum=new Date(data[i].datum)
      }
      this.zakazaniPregledi.forEach(element => {
        this.lekarService.dohvatiLekaraKorIme(element.lekar).subscribe((l:Lekar)=>{
          element.lekar_ime=l.ime;
          element.lekar_prezime=l.prezime;
          element.lekar_ogranak=l.ogranak_ordinacije
        })
        
    })
    this.zakazaniPregledi=this.sortZakazanePreglede();
  })
  })
}
}
