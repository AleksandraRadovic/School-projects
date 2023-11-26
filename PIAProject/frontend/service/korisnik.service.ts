import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http:HttpClient) { }

  uri='http://localhost:4000'

  prijava(kor_ime){
    const data={
      kor_ime:kor_ime,
    }

    return this.http.post(`${this.uri}/korisnici/prijava`, data)
  }

  dohvatiKorisnikaKorIme(kor_ime){
    const data={
      kor_ime:kor_ime,
    }

    return this.http.post(`${this.uri}/korisnici/dohvatiKorisnikaKorIme`, data)
  }

  ucitajSliku(photo: File){
    const uploadData = new FormData();
    uploadData.append('file', photo,photo.name);
    return this.http.post(`${this.uri}/ucitajSliku`, uploadData);
     
  }

  skiniSliku(photo){
    const podaci = {
      photo: photo
    }

    return this.http.post(`${this.uri}/skiniSliku`, podaci, {responseType: "blob"});
  }

  promeniLozinku(kor_ime,lozinka){
    const data = {
      kor_ime:kor_ime, 
      lozinka:lozinka
    }

    return this.http.post(`${this.uri}/korisnici/promeniLozinku`, data)
  }

  azurirajKorIme(kor_ime,novo_kor_ime){
    const data = {
      kor_ime:kor_ime, 
      novo_kor_ime:novo_kor_ime
    }

    return this.http.post(`${this.uri}/korisnici/azurirajKorIme`, data)
  }

  azurirajLozinku(kor_ime,nova_lozinka){
    const data = {
      kor_ime:kor_ime, 
      nova_lozinka:nova_lozinka
    }

    return this.http.post(`${this.uri}/korisnici/azurirajLozinku`, data)
  }

  dodajKorisnika(kor_ime, lozinka, tip){
    const data={
      kor_ime:kor_ime,
      lozinka:lozinka,
      tip:tip
    }
    return this.http.post(`${this.uri}/korisnici/dodajKorisnika`, data)
  }

  obrisiKorisnika(kor_ime){
    const data={
      kor_ime:kor_ime,
    }

    return this.http.post(`${this.uri}/korisnici/obrisiKorisnika`, data)
  }
}
