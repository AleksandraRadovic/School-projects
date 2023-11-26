import express from 'express';
import { LekarController } from '../controllers/lekar.controller';

const lekarRouter = express.Router();

lekarRouter.route('/dohvatiSveLekare').get(
    (req, res)=> new LekarController().dohvatiSveLekare(req, res)
)

lekarRouter.route("/promeniLozinkuLekaru").post(
    (req, res)=> new LekarController().promeniLozinkuLekaru(req, res)
)

lekarRouter.route("/dohvatiLekaraKorIme").post(
    (req, res)=> new LekarController().dohvatiLekaraKorIme(req, res)
)

lekarRouter.route("/obrisiLekara").post(
    (req, res)=> new LekarController().obrisiLekara(req, res)
)

lekarRouter.route("/azurirajKorIme").post(
    (req, res)=> new LekarController().azurirajKorIme(req, res)
)

lekarRouter.route("/azurirajLozinku").post(
    (req, res)=> new LekarController().azurirajLozinku(req, res)
)

lekarRouter.route("/azurirajIme").post(
    (req, res)=> new LekarController().azurirajIme(req, res)
)

lekarRouter.route("/azurirajPrezime").post(
    (req, res)=> new LekarController().azurirajPrezime(req, res)
)

lekarRouter.route("/azurirajAdresu").post(
    (req, res)=> new LekarController().azurirajAdresu(req, res)
)

lekarRouter.route("/azurirajKontaktTelefont").post(
    (req, res)=> new LekarController().azurirajKontaktTelefont(req, res)
)

lekarRouter.route("/azurirajBrLekLicence").post(
    (req, res)=> new LekarController().azurirajBrLekLicence(req, res)
)

lekarRouter.route("/azurirajSpecijalizaciju").post(
    (req, res)=> new LekarController().azurirajSpecijalizaciju(req, res)
)

lekarRouter.route("/azurirajSliku").post(
    (req, res)=> new LekarController().azurirajSliku(req, res)
)

lekarRouter.route("/dohvatiSveSpecijalizacije").get(
    (req, res)=> new LekarController().dohvatiSveSpecijalizacije(req, res)
)

lekarRouter.route("/dodajLekara").post(
    (req, res)=> new LekarController().dodajLekara(req, res)
)

lekarRouter.route("/dodajSpecijalizaciju").post(
    (req, res)=> new LekarController().dodajSpecijalizaciju(req, res)
)

lekarRouter.route("/dohvatiLekaraEmail").post(
    (req, res)=> new LekarController().dohvatiLekaraEmail(req, res)
)

lekarRouter.route("/dohvatiMojeIzabranePreglede").post(
    (req, res)=> new LekarController().dohvatiMojeIzabranePreglede(req, res)
)

lekarRouter.route("/izbaciMojeVrstePregleda").post(
    (req, res)=> new LekarController().izbaciMojeVrstePregleda(req, res)
)

lekarRouter.route("/ubaciMojeVrstePregleda").post(
    (req, res)=> new LekarController().ubaciMojeVrstePregleda(req, res)
)

lekarRouter.route("/azurirajKorImeLekariPregledi").post(
    (req, res)=> new LekarController().azurirajKorImeLekariPregledi(req, res)
)
export default lekarRouter;