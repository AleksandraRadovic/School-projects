import { Component, OnInit } from '@angular/core';
import { ZakazaniPregled } from '../models/zakazani_pregled';
import { Router } from '@angular/router';
import { ZakazaniPregledService } from '../zakazani-pregled.service';
import { Korisnik } from '../models/korisnik';
import { PacijentService } from '../pacijent.service';
import { Pacijent } from '../models/pacijent';

@Component({
  selector: 'app-lekar-pregledi',
  templateUrl: './lekar-pregledi.component.html',
  styleUrls: ['./lekar-pregledi.component.css']
})
export class LekarPreglediComponent implements OnInit {

  constructor(private router:Router, private zakazani_pregledService:ZakazaniPregledService,
    private pacijentService:PacijentService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    this.zakazani_pregledService.dohvatiZakazanePregledeLekara(this.korisnik.kor_ime).subscribe((data:ZakazaniPregled[])=>{
      this.mojaTriPregleda=data;
      for(let i=0;i<data.length;i++){
        this.mojaTriPregleda[i].zpDatum=new Date(data[i].datum)
      }
      this.mojaTriPregleda.forEach(element => {
        this.pacijentService.dohvatiPacijentaKorIme(element.pacijent).subscribe((p:Pacijent)=>{
          element.pacijent_ime=p.ime;
          element.pacijent_prezime=p.prezime;
          element.obrazlozenjeFlag=false;
        })
        
    })
      this.mojaTriPregleda=this.sortZakazanePreglede();
      this.mojaTriPregleda=this.mojaTriPregleda.slice(0,3)
    })
    this.obrazlozenje=""
    this.zakazani_pregledService.dohvatiSvePregledeLekara(this.korisnik.kor_ime).subscribe((data:ZakazaniPregled[])=>{
      this.sviMojiPacijenti=[]
      for(let i =0;i<data.length;i++){
        this.pacijentService.dohvatiPacijentaKorIme(data[i].pacijent).subscribe((p:Pacijent)=>{
          this.sviMojiPacijenti.push(p)
        })
      }
    })
  }

  mojaTriPregleda:ZakazaniPregled[]
  korisnik:Korisnik;
  obrazlozenje:string
  sviMojiPacijenti:Pacijent[]

  sortZakazanePreglede(): ZakazaniPregled[]{
    let sviZakazaniPregledi = this.mojaTriPregleda;
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
  pogledaj_karton(kor_ime_pacijent){
    this.router.navigate(['karton_pacijenta/'+kor_ime_pacijent])
  }

  obavi_pregled(idZP){
    this.zakazani_pregledService.obaviPregledId(idZP).subscribe(res=>{
      if(res['poruka']=='ok'){
      this.zakazani_pregledService.dohvatiZakazanePregledeLekara(this.korisnik.kor_ime).subscribe((data:ZakazaniPregled[])=>{
        this.mojaTriPregleda=data;
        for(let i=0;i<data.length;i++){
          this.mojaTriPregleda[i].zpDatum=new Date(data[i].datum)
        }
        this.mojaTriPregleda.forEach(element => {
          this.pacijentService.dohvatiPacijentaKorIme(element.pacijent).subscribe((p:Pacijent)=>{
            element.pacijent_ime=p.ime;
            element.pacijent_prezime=p.prezime;
          })
          
      })
        this.mojaTriPregleda=this.sortZakazanePreglede();
        this.mojaTriPregleda=this.mojaTriPregleda.slice(0,3)
      })}
    })
  }
  otkazi(idZP){
for(let i=0;i<this.mojaTriPregleda.length;i++){
if(this.mojaTriPregleda[i].idZP==idZP){
  this.mojaTriPregleda[i].obrazlozenjeFlag=true;
}
}
  }
  potvrdi(idZP){
    this.zakazani_pregledService.otkaziPregledId(idZP).subscribe(res=>{
      if(res['poruka']=='ok'){
        this.zakazani_pregledService.dodajOtkazaniPregled(idZP, this.obrazlozenje).subscribe(res=>{
          if(res['poruka']=='otkazani_pregled je dodat'){
            this.zakazani_pregledService.dohvatiZakazanePregledeLekara(this.korisnik.kor_ime).subscribe((data:ZakazaniPregled[])=>{
              this.mojaTriPregleda=data;
              for(let i=0;i<data.length;i++){
                this.mojaTriPregleda[i].zpDatum=new Date(data[i].datum)
              }
              this.mojaTriPregleda.forEach(element => {
                this.pacijentService.dohvatiPacijentaKorIme(element.pacijent).subscribe((p:Pacijent)=>{
                  element.pacijent_ime=p.ime;
                  element.pacijent_prezime=p.prezime;
                })
                
            })
              this.mojaTriPregleda=this.sortZakazanePreglede();
              this.mojaTriPregleda=this.mojaTriPregleda.slice(0,3)
            })
          }
        })
      }
    })
  }
}
