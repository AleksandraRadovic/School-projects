import express from 'express';
import korisnik from '../models/korisnik';

export class KorisnikController{
    prijava = (req:express.Request, res:express.Response)=>{
        let kor_ime = req.body.kor_ime;

        korisnik.findOne({"kor_ime":kor_ime}, (err, korisnik)=>{
            if(err)
                console.log(err)
            
            else
                res.json(korisnik)
            
        })
    }

    dohvatiKorisnikaKorIme = (req:express.Request, res:express.Response)=>{
        let kor_ime = req.body.kor_ime;

        korisnik.findOne({'kor_ime':kor_ime}, (err, korisnik)=>{
            if(err) console.log(err);
            else res.json(korisnik)
        })
    }

    promeniLozinku=(req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let lozinka=req.body.lozinka;
        
        korisnik.collection.updateOne({'kor_ime':kor_ime},{$set:{'lozinka':lozinka}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajKorIme = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let novo_kor_ime=req.body.novo_kor_ime;
        
        korisnik.collection.updateOne({'kor_ime':kor_ime},{$set:{'kor_ime':novo_kor_ime}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajLozinku  = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let nova_lozinka=req.body.nova_lozinka;
        
        korisnik.collection.updateOne({'kor_ime':kor_ime},{$set:{'lozinka':nova_lozinka}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    dodajKorisnika=(req:express.Request, res:express.Response)=>{
        let noviKorisnik=new korisnik(req.body)

        noviKorisnik.save().then((noviKorisnik)=>{
            res.status(200).json({'poruka':'korisnik je dodat'})
        }).catch((err)=>{
            res.status(400).json({'poruka':err})
        })
    }

    obrisiKorisnika=(req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;

    korisnik.collection.deleteOne({ 'kor_ime': kor_ime})
    res.json({ 'poruka': 'ok' })
    }
}
