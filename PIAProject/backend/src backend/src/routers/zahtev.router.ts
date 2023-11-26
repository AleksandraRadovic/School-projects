import express from 'express'
import { ZahtevController } from '../controllers/zahtev.controller';

const zahtevRouter = express.Router();

zahtevRouter.route('/registracijaPacijenta').post(
    (req, res) => new ZahtevController().registracijaPacijenta(req, res)
)

zahtevRouter.route('/dohvatiOdbijenZahtevKorIme').post(
    (req, res) => new ZahtevController().dohvatiOdbijenZahtevKorIme(req, res)
)

zahtevRouter.route('/dohvatiOdbijenZahtevEmail').post(
    (req, res) => new ZahtevController().dohvatiOdbijenZahtevEmail(req, res)
)

zahtevRouter.route('/dohvatiSveZahteveZaRegistraciju').get(
    (req, res) => new ZahtevController().dohvatiSveZahteveZaRegistraciju(req, res)
)

zahtevRouter.route('/prihvatiZahtev').post(
    (req, res) => new ZahtevController().prihvatiZahtev(req, res)
)

zahtevRouter.route('/odbijZahtev').post(
    (req, res) => new ZahtevController().odbijZahtev(req, res)
)
export default zahtevRouter;