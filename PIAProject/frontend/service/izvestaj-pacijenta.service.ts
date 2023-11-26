import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class IzvestajPacijentaService {

  constructor(private http:HttpClient) { }

  uri='http://localhost:4000'

  dohvatiIzvestajePacijenta(pacijent){
    const data = {
      pacijent:pacijent
    }

    return this.http.post(`${this.uri}/izvestaji_pacijenata/dohvatiIzvestajePacijenta`, data)
  }

  dodajIzvestaj(idI, zpID, razlog_dolaska, dijagnoza, preporucena_terapija, datum_kontrole, pacijent){
    const data = {
      idI:idI,
      zpID:zpID,
      razlog_dolaska:razlog_dolaska,
      dijagnoza:dijagnoza,
      preporucena_terapija:preporucena_terapija,
      datum_kontrole:datum_kontrole,
      pacijent:pacijent
    }
    return this.http.post(`${this.uri}/izvestaji_pacijenata/dodajIzvestaj`, data)
  }

  dohvatiSveIzvestaje(){
    return this.http.get(`${this.uri}/izvestaji_pacijenata/dohvatiSveIzvestaje`)
  }

  azurirajPacijenta(idI, novi_pacijent){
    const data = {
      idI:idI,
      novi_pacijent:novi_pacijent
    }

    return this.http.post(`${this.uri}/izvestaji_pacijenata/azurirajPacijenta`, data)

  }
}
