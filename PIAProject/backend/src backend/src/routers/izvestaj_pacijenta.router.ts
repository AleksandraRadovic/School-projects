import express from 'express'
import { IzvestajPacijentaController } from '../controllers/izvestaj_pacijenta.controller';

const izvestaj_pacijentaRouter=express.Router()

izvestaj_pacijentaRouter.route('/dohvatiIzvestajePacijenta').post(
    (req, res)=> new IzvestajPacijentaController().dohvatiIzvestajePacijenta(req, res)
)

izvestaj_pacijentaRouter.route('/dodajIzvestaj').post(
    (req, res)=> new IzvestajPacijentaController().dodajIzvestaj(req, res)
)

izvestaj_pacijentaRouter.route('/dohvatiSveIzvestaje').get(
    (req, res)=> new IzvestajPacijentaController().dohvatiSveIzvestaje(req, res)
)

izvestaj_pacijentaRouter.route('/azurirajPacijenta').post(
    (req, res)=> new IzvestajPacijentaController().azurirajPacijenta(req, res)
)
export default izvestaj_pacijentaRouter;