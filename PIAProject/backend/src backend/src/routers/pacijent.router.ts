import express from 'express';
import { PacijentController } from '../controllers/pacijent.controller';

const pacijentRouter = express.Router();

pacijentRouter.route("/dohvatiPacijentaEmail").post(
    (req, res)=> new PacijentController().dohvatiPacijentaEmail(req, res)
)

pacijentRouter.route("/promeniLozinkuPacijentu").post(
    (req, res)=> new PacijentController().promeniLozinkuPacijentu(req, res)
)

pacijentRouter.route("/dohvatiPacijentaKorIme").post(
    (req, res)=> new PacijentController().dohvatiPacijentaKorIme(req, res)
)

pacijentRouter.route("/dohvatiSvePacijente").get(
    (req, res)=> new PacijentController().dohvatiSvePacijente(req, res)
)

pacijentRouter.route("/azurirajKorIme").post(
    (req, res)=> new PacijentController().azurirajKorIme(req, res)
)

pacijentRouter.route("/azurirajLozinku").post(
    (req, res)=> new PacijentController().azurirajLozinku(req, res)
)

pacijentRouter.route("/azurirajIme").post(
    (req, res)=> new PacijentController().azurirajIme(req, res)
)

pacijentRouter.route("/azurirajPrezime").post(
    (req, res)=> new PacijentController().azurirajPrezime(req, res)
)

pacijentRouter.route("/azurirajAdresu").post(
    (req, res)=> new PacijentController().azurirajAdresu(req, res)
)

pacijentRouter.route("/azurirajEmail").post(
    (req, res)=> new PacijentController().azurirajEmail(req, res)
)

pacijentRouter.route("/azurirajKontaktTelefont").post(
    (req, res)=> new PacijentController().azurirajKontaktTelefont(req, res)
)

pacijentRouter.route("/azurirajSliku").post(
    (req, res)=> new PacijentController().azurirajSliku(req, res)
)

pacijentRouter.route("/dodajPacijenta").post(
    (req, res)=> new PacijentController().dodajPacijenta(req, res)
)

pacijentRouter.route("/obrisiPacijenta").post(
    (req, res)=> new PacijentController().obrisiPacijenta(req, res)
)

export default pacijentRouter;