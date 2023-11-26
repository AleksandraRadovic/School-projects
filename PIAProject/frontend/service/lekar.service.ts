import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LekarService {

  constructor(private http:HttpClient) { }

  uri='http://localhost:4000'

  dohvatiSveLekare(){
    return this.http.get(`${this.uri}/lekari/dohvatiSveLekare`)
  }

  promeniLozinkuLekaru(kor_ime, lozinka){
    const data = {
      kor_ime:kor_ime,
      lozinka:lozinka
    }

    return this.http.post(`${this.uri}/lekari/promeniLozinkuLekaru`, data)
  }

  dohvatiLekaraKorIme(kor_ime){
    const data = {
      kor_ime:kor_ime
    }

    return this.http.post(`${this.uri}/lekari/dohvatiLekaraKorIme`, data)
  }

  obrisiLekara(kor_ime){
    const data = {
      kor_ime:kor_ime
    }

    return this.http.post(`${this.uri}/lekari/obrisiLekara`, data)
  }

  azurirajKorIme(kor_ime, novo_kor_ime){
    const data = {
      kor_ime:kor_ime,
      novo_kor_ime:novo_kor_ime
    }

    return this.http.post(`${this.uri}/lekari/azurirajKorIme`, data)
  }

  azurirajLozinku(kor_ime, nova_lozinka){
    const data = {
      kor_ime:kor_ime,
      nova_lozinka:nova_lozinka
    }

    return this.http.post(`${this.uri}/lekari/azurirajLozinku`, data)
  }

  azurirajIme(kor_ime, novo_ime){
    const data = {
      kor_ime:kor_ime,
      novo_ime:novo_ime
    }

    return this.http.post(`${this.uri}/lekari/azurirajIme`, data)
  }

  azurirajPrezime(kor_ime, novo_prezime){
    const data = {
      kor_ime:kor_ime,
      novo_prezime:novo_prezime
    }

    return this.http.post(`${this.uri}/lekari/azurirajPrezime`, data)
  }

  azurirajAdresu(kor_ime, nova_adresa){
    const data = {
      kor_ime:kor_ime,
      nova_adresa:nova_adresa
    }

    return this.http.post(`${this.uri}/lekari/azurirajAdresu`, data)
  }

  azurirajKontaktTelefont(kor_ime, novi_kontakt_telefont){
    const data = {
      kor_ime:kor_ime,
      novi_kontakt_telefont:novi_kontakt_telefont
    }

    return this.http.post(`${this.uri}/lekari/azurirajKontaktTelefont`, data)
  }

  azurirajBrLekLicence(kor_ime, novi_br_lek_licence){
    const data = {
      kor_ime:kor_ime,
      novi_br_lek_licence:novi_br_lek_licence
    }

    return this.http.post(`${this.uri}/lekari/azurirajBrLekLicence`, data)
  }

  azurirajSpecijalizaciju(kor_ime, nova_specijalizacija){
    const data = {
      kor_ime:kor_ime,
      nova_specijalizacija:nova_specijalizacija
    }

    return this.http.post(`${this.uri}/lekari/azurirajSpecijalizaciju`, data)
  }

  azurirajSliku(kor_ime, nova_slika){
    const data = {
      kor_ime:kor_ime,
      nova_slika:nova_slika
    }

    return this.http.post(`${this.uri}/lekari/azurirajSliku`, data)
  }

  dohvatiSveSpecijalizacije(){
    return this.http.get(`${this.uri}/specijalizacije/dohvatiSveSpecijalizacije`)
  }

  dodajLekara(kor_ime, lozinka, ime, prezime, adresa, kontakt_telefon, br_lek_licence, specijalizacija, ogranak_ordinacije, email, slika){
    const data = {
      kor_ime:kor_ime,
      lozinka:lozinka,
      ime:ime,
      prezime:prezime,
      adresa:adresa,
      kontakt_telefon:kontakt_telefon, 
      br_lek_licence:br_lek_licence,
      specijalizacija:specijalizacija,
      ogranak_ordinacije:ogranak_ordinacije,
      email:email,
      slika:slika 
    }

    return this.http.post(`${this.uri}/lekari/dodajLekara`, data)
  }

  dodajSpecijalizaciju(naziv){
    const data = {
      naziv:naziv
    }

    return this.http.post(`${this.uri}/specijalizacije/dodajSpecijalizaciju`, data)

  }

  dohvatiLekaraEmail(email){
    const data = {
      email:email
    }

    return this.http.post(`${this.uri}/lekari/dohvatiLekaraEmail`, data)
  }

  dohvatiMojeIzabranePreglede(lekar){
    const data = {
      lekar:lekar
    }

    return this.http.post(`${this.uri}/lekari_pregledi/dohvatiMojeIzabranePreglede`, data)
  }

  izbaciMojeVrstePregleda(lekar){
    const data = {
      lekar:lekar
    }

    return this.http.post(`${this.uri}/lekari_pregledi/izbaciMojeVrstePregleda`, data)
  }

  ubaciMojeVrstePregleda(lekar, IDp){
    const data = {
      lekar:lekar,
      IDp:IDp
    }

    return this.http.post(`${this.uri}/lekari_pregledi/ubaciMojeVrstePregleda`, data)
  }

  azurirajKorImeLekariPregledi(lekar, novi_lekar){
    const data={
      lekar:lekar,
      novi_lekar:novi_lekar
    }
    return this.http.post(`${this.uri}/lekari_pregledi/azurirajKorImeLekariPregledi`, data)


  }
}
