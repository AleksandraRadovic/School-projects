import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class ZakazaniPregledService {

  constructor(private http:HttpClient) { }

  uri='http://localhost:4000'

  dohvatiZakazanePregledePacijenta(pacijent){
    const data = {
      pacijent:pacijent
    }

    return this.http.post(`${this.uri}/zakazani_pregledi/dohvatiZakazanePregledePacijenta`, data)
  }

  dohvatiZakazaniPregledId(idZP){
    const data = {
      idZP:idZP
    }

    return this.http.post(`${this.uri}/zakazani_pregledi/dohvatiZakazaniPregledId`, data)
  }

  otkaziPregledId(idZP){
    const data = {
      idZP:idZP
    }

    return this.http.post(`${this.uri}/zakazani_pregledi/otkaziPregledId`, data)
  }

  dohvatiZakazanePregledeLekara(lekar){
    const data = {
      lekar:lekar
    }

    return this.http.post(`${this.uri}/zakazani_pregledi/dohvatiZakazanePregledeLekara`, data)
  }

  obaviPregledId(idZP){
    const data = {
      idZP:idZP
    }

    return this.http.post(`${this.uri}/zakazani_pregledi/obaviPregledId`, data)
  }

  dohvatiSveObavljenePregledeBezIzvestaja(pacijent, lekar){
    const data = {
      pacijent:pacijent,
      lekar:lekar
    }

    return this.http.post(`${this.uri}/zakazani_pregledi/dohvatiSveObavljenePregledeBezIzvestaja`, data)
  }

  napisiIzvestajId(idZP){
    const data = {
      idZP:idZP
    }

    return this.http.post(`${this.uri}/zakazani_pregledi/napisiIzvestajId`, data)
  }

  azurirajPacijenta(idZP, novi_pacijent){
    const data = {
      idZP:idZP,
      novi_pacijent:novi_pacijent
    }

    return this.http.post(`${this.uri}/zakazani_pregledi/azurirajPacijenta`, data)
  }

  dohvatiSvePregledePacijenta(pacijent){
    const data = {
      pacijent:pacijent
    }

    return this.http.post(`${this.uri}/zakazani_pregledi/dohvatiSvePregledePacijenta`, data)
  }

  azurirajLekara(idZP, novi_lekar){
    const data = {
      idZP:idZP,
      novi_lekar:novi_lekar
    }

    return this.http.post(`${this.uri}/zakazani_pregledi/azurirajLekara`, data)
  }

  dohvatiSvePregledeLekara(lekar){
    const data = {
      lekar:lekar
    }

    return this.http.post(`${this.uri}/zakazani_pregledi/dohvatiSvePregledeLekara`, data)
  }

  dodajOtkazaniPregled(IDzp, obrazlozenje){
    const data = {
      IDzp:IDzp,
      obrazlozenje:obrazlozenje
    }

    return this.http.post(`${this.uri}/otkazani_pregledi/dodajOtkazaniPregled`, data)
  }

  dodajZakazaniPregled(idZP, pregled, pacijent, lekar,datum,krajPregleda ,pocetakPregleda,vreme ){
    const data = {
      idZP:idZP,
      pregled:pregled,
      pacijent:pacijent,
      lekar:lekar,
      status:"zakazano",
      datum:datum,
      krajPregleda:krajPregleda,
      pocetakPregleda:pocetakPregleda,
      vreme:vreme

    }

    return this.http.post(`${this.uri}/zakazani_pregledi/dodajZakazaniPregled`, data)
  }

  dohvatiSvePregledeZakazivanja(){
    return this.http.get(`${this.uri}/zakazani_pregledi/dohvatiSvePregledeZakazivanja`)
  }
  
  dohvatiZakazanePregledeLekaraZaOdredjeniDatum(lekar, datum){
    const data={
      lekar:lekar,
      datum:datum
    }
    return this.http.post(`${this.uri}/zakazani_pregledi/dohvatiZakazanePregledeLekaraZaOdredjeniDatum`, data)
  }

  }
