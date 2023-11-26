import exp from 'constants'
import express from 'express'
import { ZakazaniPregledController } from '../controllers/zakazani_pregled.controller';

const zakazani_pregledRouter = express.Router()

zakazani_pregledRouter.route('/dohvatiZakazanePregledePacijenta').post(
    (req, res)=> new ZakazaniPregledController().dohvatiZakazanePregledePacijenta(req, res)
)

zakazani_pregledRouter.route('/dohvatiZakazaniPregledId').post(
    (req, res)=> new ZakazaniPregledController().dohvatiZakazaniPregledId(req, res)
)

zakazani_pregledRouter.route('/otkaziPregledId').post(
    (req, res)=> new ZakazaniPregledController().otkaziPregledId(req, res)
)

zakazani_pregledRouter.route('/dohvatiZakazanePregledeLekara').post(
    (req, res)=> new ZakazaniPregledController().dohvatiZakazanePregledeLekara(req, res)
)

zakazani_pregledRouter.route('/obaviPregledId').post(
    (req, res)=> new ZakazaniPregledController().obaviPregledId(req, res)
)

zakazani_pregledRouter.route('/dohvatiSveObavljenePregledeBezIzvestaja').post(
    (req, res)=> new ZakazaniPregledController().dohvatiSveObavljenePregledeBezIzvestaja(req, res)
)

zakazani_pregledRouter.route('/napisiIzvestajId').post(
    (req, res)=> new ZakazaniPregledController().napisiIzvestajId(req, res)
)

zakazani_pregledRouter.route('/azurirajPacijenta').post(
    (req, res)=> new ZakazaniPregledController().azurirajPacijenta(req, res)
)

zakazani_pregledRouter.route('/dohvatiSvePregledePacijenta').post(
    (req, res)=> new ZakazaniPregledController().dohvatiSvePregledePacijenta(req, res)
)

zakazani_pregledRouter.route('/azurirajLekara').post(
    (req, res)=> new ZakazaniPregledController().azurirajLekara(req, res)
)

zakazani_pregledRouter.route('/dohvatiSvePregledeLekara').post(
    (req, res)=> new ZakazaniPregledController().dohvatiSvePregledeLekara(req, res)
)

zakazani_pregledRouter.route('/dodajOtkazaniPregled').post(
    (req, res)=> new ZakazaniPregledController().dodajOtkazaniPregled(req, res)
)

zakazani_pregledRouter.route('/dodajZakazaniPregled').post(
    (req, res)=> new ZakazaniPregledController().dodajZakazaniPregled(req, res)
)

zakazani_pregledRouter.route('/dohvatiSvePregledeZakazivanja').get(
    (req, res)=> new ZakazaniPregledController().dohvatiSvePregledeZakazivanja(req, res)
)

zakazani_pregledRouter.route('/dohvatiZakazanePregledeLekaraZaOdredjeniDatum').post(
    (req, res)=> new ZakazaniPregledController().dohvatiZakazanePregledeLekaraZaOdredjeniDatum(req, res)
)

export default zakazani_pregledRouter;