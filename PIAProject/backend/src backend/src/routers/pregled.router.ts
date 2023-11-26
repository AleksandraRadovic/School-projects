import express from "express"
import { PregledController } from "../controllers/pregled.constroller";

const pregledRouter = express.Router()

pregledRouter.route('/dohvatiPregledeLekara').post(
    (req, res)=> new PregledController().dohvatiPregledeLekara(req, res)
)

pregledRouter.route('/dodajNoviPregled').post(
    (req, res)=> new PregledController().dodajNoviPregled(req, res)
)

pregledRouter.route('/dohvatiSvePreglede').get(
    (req, res)=> new PregledController().dohvatiSvePreglede(req, res)
)

pregledRouter.route('/dohvatiNeobradjenePreglede').get(
    (req, res)=> new PregledController().dohvatiNeobradjenePreglede(req, res)
)

pregledRouter.route('/odbijPregled').post(
    (req, res)=> new PregledController().odbijPregled(req, res)
)

pregledRouter.route('/odobriPregled').post(
    (req, res)=> new PregledController().odobriPregled(req, res)
)

pregledRouter.route('/azurirajNazivPregleda').post(
    (req, res)=> new PregledController().azurirajNazivPregleda(req, res)
)

pregledRouter.route('/azurirajCenuPregleda').post(
    (req, res)=> new PregledController().azurirajCenuPregleda(req, res)
)

pregledRouter.route('/dohvatiPregledIdP').post(
    (req, res)=> new PregledController().dohvatiPregledIdP(req, res)
)
export default pregledRouter;