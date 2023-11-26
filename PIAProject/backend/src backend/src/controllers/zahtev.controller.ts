import express from 'express'
import zahtev_registracija from '../models/zahtev_registracija'

export class ZahtevController{
    
    registracijaPacijenta=(req:express.Request, res:express.Response)=>{
        let zahtevPacijent=new zahtev_registracija(req.body)

        zahtevPacijent.save().then((zahtevPacijent)=>{
            res.status(200).json({'poruka':'zahtev je dodat'})
        }).catch((err)=>{
            res.status(400).json({'poruka':err})
        })
    }

    dohvatiOdbijenZahtevKorIme = (req:express.Request, res:express.Response)=>{
        let kor_ime = req.body.kor_ime;

        zahtev_registracija.findOne({"kor_ime":kor_ime, "status":"odbijeno"}, (err, zahtev)=>{
            if(err) console.log(err)
            else res.json(zahtev)
        })
    }

    dohvatiOdbijenZahtevEmail = (req:express.Request, res:express.Response)=>{
        let email = req.body.email;

        zahtev_registracija.findOne({"kor_ime":email, "status":"odbijeno"}, (err, zahtev)=>{
            if(err) console.log(err)
            else res.json(zahtev)
        })
    }

    dohvatiSveZahteveZaRegistraciju = (req:express.Request, res:express.Response)=>{
        zahtev_registracija.find({'status':"neobradjeno"}, (err, zahtevi)=>{
            if(err) console.log(err)
            else res.json(zahtevi)
        })
    }

    prihvatiZahtev= (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        
        zahtev_registracija.collection.updateOne({'kor_ime':kor_ime},{$set:{'status':"prihvaceno"}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    odbijZahtev= (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        
        zahtev_registracija.collection.updateOne({'kor_ime':kor_ime},{$set:{'status':"odbijeno"}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

}