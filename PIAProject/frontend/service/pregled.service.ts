import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class PregledService {

  constructor(private http:HttpClient) { }

  uri='http://localhost:4000'

  dohvatiPregledeLekara(specijalizacija){
    const data = {
      specijalizacija:specijalizacija
    }

    return this.http.post(`${this.uri}/pregledi/dohvatiPregledeLekara`, data)
  }

  dodajNoviPregled(idP, specijalizacija, naziv, trajanje, cena){
    const data = {
      idP:idP,
      specijalizacija:specijalizacija,
      naziv:naziv,
      trajanje:trajanje,
      cena:cena,
      status:"neobradjeno"
    }

    return this.http.post(`${this.uri}/pregledi/dodajNoviPregled`, data)
  }

  dohvatiSvePreglede(){
    return this.http.get(`${this.uri}/pregledi/dohvatiSvePreglede`)
  }

  dohvatiNeobradjenePreglede(){
    return this.http.get(`${this.uri}/pregledi/dohvatiNeobradjenePreglede`)
  }

  odbijPregled(idP){
    const data = {
      idP:idP
    }

    return this.http.post(`${this.uri}/pregledi/odbijPregled`, data)
  }

  odobriPregled(idP){
    const data = {
      idP:idP
    }

    return this.http.post(`${this.uri}/pregledi/odobriPregled`, data)
  }

  dodajNoviPregledMenadzer(idP, specijalizacija, naziv, trajanje, cena){
    const data = {
      idP:idP,
      specijalizacija:specijalizacija,
      naziv:naziv,
      trajanje:trajanje,
      cena:cena,
      status:"validan"
    }

    return this.http.post(`${this.uri}/pregledi/dodajNoviPregled`, data)
  }

  azurirajNazivPregleda(idP, novi_naziv){
    const data = {
      idP:idP,
      novi_naziv:novi_naziv
    }

    return this.http.post(`${this.uri}/pregledi/azurirajNazivPregleda`, data)
  }

  azurirajCenuPregleda(idP, nova_cena){
    const data = {
      idP:idP,
      nova_cena:nova_cena
    }

    return this.http.post(`${this.uri}/pregledi/azurirajCenuPregleda`, data)
  }

  dohvatiPregledIdP(idP){
    const data = {
      idP:idP
    }

    return this.http.post(`${this.uri}/pregledi/dohvatiPregledIdP`, data)
  }
}
