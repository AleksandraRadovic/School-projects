import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ZahtevService {

  constructor(private http:HttpClient) { }

  uri='http://localhost:4000'

  registracijaPacijenta(kor_ime, lozinka, ime, prezime, kontakt_telefon, email, adresa, slika){
    const data={
      kor_ime:kor_ime,
      lozinka:lozinka,
      ime:ime,
      prezime:prezime,
      kontakt_telefon:kontakt_telefon,
      email:email,
      adresa:adresa,
      slika:slika,
      status:"neobradjeno",
    }

    return this.http.post(`${this.uri}/zahtevi_registracija/registracijaPacijenta`, data)
}

dohvatiOdbijenZahtevKorIme(kor_ime){
  const data = {
    kor_ime:kor_ime
  }

  return this.http.post(`${this.uri}/zahtevi_registracija/dohvatiOdbijenZahtevKorIme`, data)
}

dohvatiOdbijenZahtevEmail(email){
  const data = {
    emial:email
  }

  return this.http.post(`${this.uri}/zahtevi_registracija/dohvatiOdbijenZahtevEmail`, data)
}

dohvatiSveZahteveZaRegistraciju(){
  return this.http.get(`${this.uri}/zahtevi_registracija/dohvatiSveZahteveZaRegistraciju`)
}

prihvatiZahtev(kor_ime){
  const data = {
    kor_ime:kor_ime
  }
  return this.http.post(`${this.uri}/zahtevi_registracija/prihvatiZahtev`, data)

}

odbijZahtev(kor_ime){
  const data = {
    kor_ime:kor_ime
  }
  return this.http.post(`${this.uri}/zahtevi_registracija/odbijZahtev`, data)

}
}