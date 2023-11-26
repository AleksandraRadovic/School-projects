import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IzvestajPacijentaService } from '../izvestaj-pacijenta.service';
import { ZakazaniPregledService } from '../zakazani-pregled.service';
import { Korisnik } from '../models/korisnik';
import { Pregled } from '../models/pregled';
import { ZakazaniPregled } from '../models/zakazani_pregled';
import { Lekar } from '../models/lekar';
import { LekarService } from '../lekar.service';
import { IzvestajPacijenta } from '../models/izvestaj_pacijenta';

@Component({
  selector: 'app-napisi-izvestaj',
  templateUrl: './napisi-izvestaj.component.html',
  styleUrls: ['./napisi-izvestaj.component.css']
})
export class NapisiIzvestajComponent implements OnInit {

  constructor(private router:Router, private activatedRoute:ActivatedRoute, 
    private izvestaj_pacijentaService:IzvestajPacijentaService, private zakazani_pregledService:ZakazaniPregledService, 
    private lekarService:LekarService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    this.lekarService.dohvatiLekaraKorIme(this.korisnik.kor_ime).subscribe((l:Lekar)=>{
      this.lekar=l
    })
    this.zakazani_pregledService.dohvatiZakazaniPregledId(this.activatedRoute.snapshot.paramMap.get("idZP")).subscribe((zp:ZakazaniPregled)=>{
      this.zakazaniPregled=zp
    })

    this.razlog_dolaska="";
this.dijagnoza="";
this.preporucena_terapija="";
this.datum_kontrole="";
this.poruka="";
  }

korisnik:Korisnik
zakazaniPregled:ZakazaniPregled
lekar:Lekar
razlog_dolaska:string;
dijagnoza:string;
preporucena_terapija:string;
datum_kontrole:string;
poruka:string;

napisi_izvestaj(){
if(this.razlog_dolaska == "" || this.dijagnoza == "" || this.preporucena_terapija =="" || this.datum_kontrole==""){
  this.poruka="Morate popuniti sva polja"
  return
}
else{
  this.izvestaj_pacijentaService.dohvatiSveIzvestaje().subscribe((data:IzvestajPacijenta[])=>{
    let id=0;
    data.forEach(element => {
      if(id<element.idI){
        id=element.idI
      }
    });
   id+=1;
   this.izvestaj_pacijentaService.dodajIzvestaj(id, this.zakazaniPregled.idZP, this.razlog_dolaska, this.dijagnoza, this.preporucena_terapija, this.datum_kontrole, this.zakazaniPregled.pacijent).subscribe(res=>{
    if(res['poruka']=='izvestaj je dodat'){}
    this.zakazani_pregledService.napisiIzvestajId(this.zakazaniPregled.idZP).subscribe(res=>{
      if(res['poruka']=='ok'){}
      this.router.navigate(['lekar_pregledi'])
    })
   })
})
}
}
}
