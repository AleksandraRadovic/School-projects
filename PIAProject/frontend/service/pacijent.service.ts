import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class PacijentService {

  constructor(private http:HttpClient) { }

  uri='http://localhost:4000'

  dohvatiPacijentaEmail(email){
    const data = {
      email:email
    }

    return this.http.post(`${this.uri}/pacijenti/dohvatiPacijentaEmail`, data)
  }
  
  promeniLozinkuPacijentu(kor_ime, lozinka){
    const data = {
      kor_ime:kor_ime,
      lozinka:lozinka
    }

    return this.http.post(`${this.uri}/pacijenti/promeniLozinkuPacijentu`, data)
  }
  
  dohvatiPacijentaKorIme(kor_ime){
    const data = {
      kor_ime:kor_ime
    }

    return this.http.post(`${this.uri}/pacijenti/dohvatiPacijentaKorIme`, data)
  }

  dohvatiSvePacijente(){
    return this.http.get(`${this.uri}/pacijenti/dohvatiSvePacijente`)
  }

  azurirajKorIme(kor_ime, novo_kor_ime){
    const data = {
      kor_ime:kor_ime,
      novo_kor_ime:novo_kor_ime
    }

    return this.http.post(`${this.uri}/pacijenti/azurirajKorIme`, data)
  }

  azurirajLozinku(kor_ime, nova_lozinka){
    const data = {
      kor_ime:kor_ime,
      nova_lozinka:nova_lozinka
    }

    return this.http.post(`${this.uri}/pacijenti/azurirajLozinku`, data)
  }

  azurirajIme(kor_ime, novo_ime){
    const data = {
      kor_ime:kor_ime,
      novo_ime:novo_ime
    }

    return this.http.post(`${this.uri}/pacijenti/azurirajIme`, data)
  }

  azurirajPrezime(kor_ime, novo_prezime){
    const data = {
      kor_ime:kor_ime,
      novo_prezime:novo_prezime
    }

    return this.http.post(`${this.uri}/pacijenti/azurirajIme`, data)
  }

  azurirajAdresu(kor_ime, nova_adresa){
    const data = {
      kor_ime:kor_ime,
      nova_adresa:nova_adresa
    }

    return this.http.post(`${this.uri}/pacijenti/azurirajAdresu`, data)
  }

  azurirajEmail(kor_ime, novi_email){
    const data = {
      kor_ime:kor_ime,
      novi_email:novi_email
    }

    return this.http.post(`${this.uri}/pacijenti/azurirajEmail`, data)
  }

  azurirajKontaktTelefont(kor_ime, novi_kontakt_telefont){
    const data = {
      kor_ime:kor_ime,
      novi_kontakt_telefont:novi_kontakt_telefont
    }

    return this.http.post(`${this.uri}/pacijenti/azurirajKontaktTelefont`, data)
  }

  azurirajSliku(kor_ime, nova_slika){
    const data = {
      kor_ime:kor_ime,
      nova_slika:nova_slika
    }

    return this.http.post(`${this.uri}/pacijenti/azurirajSliku`, data)
  }

  dodajPacijenta(kor_ime, lozinka, ime, prezime, adresa, kontakt_telefon, email, slika){
    const data={
      kor_ime:kor_ime,
      lozinka:lozinka,
      ime:ime,
      prezime:prezime,
      adresa:adresa,
      kontakt_telefon:kontakt_telefon,
      email:email,
      slika:slika
    }

    return this.http.post(`${this.uri}/pacijenti/dodajPacijenta`, data)
  }

  obrisiPacijenta(kor_ime){
    const data = {
      kor_ime:kor_ime
    }

    return this.http.post(`${this.uri}/pacijenti/obrisiPacijenta`, data)
  }
}
