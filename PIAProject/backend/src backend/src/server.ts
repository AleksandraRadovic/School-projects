import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser'
import korisnikRouter from './routers/korisnik.router';
import pacijentRouter from './routers/pacijent.router';
import lekarRouter from './routers/lekar.router';
import zahtevRouter from './routers/zahtev.router';
import pregledRouter from './routers/pregled.router';
import zakazani_pregledRouter from './routers/zakazani_pregled.router';
import izvestaj_pacijentaRouter from './routers/izvestaj_pacijenta.router';


const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/projekat_2023")
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log("db connected")
})

const router=express.Router();


const multer = require('multer');

///   -----   single file   -----   ///
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/app/src/assets');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
const upload = multer({ storage: storage }).single('file');
 
app.post('/ucitajSliku', (req, res) => {
      upload(req, res, (err) => {
        
        if (err) {
            console.log(err);
        }
        console.log("Uspesan upload slike");
        res.status(200).json({"ret":"ok"});
    });
  });

app.post('/skiniSliku', (req,res)=>{
   let photo = req.body.photo;
 
    res.sendFile(req.body.photo, { root: "../frontend/app/src/assets"});
});

app.post('/ucitajFile', (req, res) => {
  upload(req, res, (err) => {
    
    if (err) {
        console.log(err);
    }
    console.log("Uspesan upload fajla");
    res.status(200).json({"ret":"ok"});
  });
});

app.use('/', router);
app.use('/korisnici', korisnikRouter);
app.use('/pacijenti', pacijentRouter);
app.use('/lekari', lekarRouter);
app.use('/zahtevi_registracija', zahtevRouter);
app.use('/pregledi', pregledRouter)
app.use('/zakazani_pregledi', zakazani_pregledRouter)
app.use('/izvestaji_pacijenata', izvestaj_pacijentaRouter)
app.use('/specijalizacije', lekarRouter)
app.use('/otkazani_pregledi', zakazani_pregledRouter)
app.use('/lekari_pregledi', lekarRouter)
app.listen(4000, () => console.log(`Express server running on port 4000`));