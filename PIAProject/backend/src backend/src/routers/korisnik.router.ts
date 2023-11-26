import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';

const korisnikRouter = express.Router();

korisnikRouter.route("/prijava").post(
    (req, res)=> new KorisnikController().prijava(req, res)
)

korisnikRouter.route("/dohvatiKorisnikaKorIme").post(
    (req, res)=> new KorisnikController().dohvatiKorisnikaKorIme(req, res)
)

korisnikRouter.route("/promeniLozinku").post(
    (req, res)=> new KorisnikController().promeniLozinku(req, res)
)

korisnikRouter.route("/azurirajKorIme").post(
    (req, res)=> new KorisnikController().azurirajKorIme(req, res)
)

korisnikRouter.route("/azurirajLozinku").post(
    (req, res)=> new KorisnikController().azurirajLozinku(req, res)
)

korisnikRouter.route("/dodajKorisnika").post(
    (req, res)=> new KorisnikController().dodajKorisnika(req, res)
)

korisnikRouter.route("/obrisiKorisnika").post(
    (req, res)=> new KorisnikController().obrisiKorisnika(req, res)
)
export default korisnikRouter;