import express from 'express';
import pacijent from '../models/pacijent';

export class PacijentController{
    
    dohvatiPacijentaEmail = (req:express.Request, res:express.Response)=>{
        let email = req.body.email;

        pacijent.findOne({"email":email}, (err, pacijent)=>{
            if(err) console.log(err)
            else res.json(pacijent)
        })
    }

    promeniLozinkuPacijentu =(req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let lozinka=req.body.lozinka;
        
        pacijent.collection.updateOne({'kor_ime':kor_ime},{$set:{'lozinka':lozinka}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    dohvatiPacijentaKorIme = (req:express.Request, res:express.Response)=>{
        let kor_ime = req.body.kor_ime

        pacijent.findOne({"kor_ime":kor_ime}, (err, pacijent)=>{
            if(err) console.log(err)
            else res.json(pacijent)
        })
    }

    dohvatiSvePacijente = (req:express.Request, res:express.Response)=>{
        pacijent.find({}, (err, pacijenti)=>{
            if(err) console.log(err)
            else res.json(pacijenti)
        })
    }

    azurirajKorIme = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let novo_kor_ime=req.body.novo_kor_ime;
        
        pacijent.collection.updateOne({'kor_ime':kor_ime},{$set:{'kor_ime':novo_kor_ime}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajLozinku  = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let nova_lozinka=req.body.nova_lozinka;
        
        pacijent.collection.updateOne({'kor_ime':kor_ime},{$set:{'lozinka':nova_lozinka}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }
    azurirajIme  = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let novo_ime=req.body.novo_ime;
        
        pacijent.collection.updateOne({'kor_ime':kor_ime},{$set:{'ime':novo_ime}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajPrezime  = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let novo_prezime=req.body.novo_prezime;
        
        pacijent.collection.updateOne({'kor_ime':kor_ime},{$set:{'prezime':novo_prezime}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajAdresu  = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let nova_adresa=req.body.nova_adresa;
        
        pacijent.collection.updateOne({'kor_ime':kor_ime},{$set:{'adresa':nova_adresa}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajEmail  = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let novi_email=req.body.novi_email;
        
        pacijent.collection.updateOne({'kor_ime':kor_ime},{$set:{'email':novi_email}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajKontaktTelefont  = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let novi_kontakt_telefont=req.body.novi_kontakt_telefont;
        
        pacijent.collection.updateOne({'kor_ime':kor_ime},{$set:{'kontakt_telefon':novi_kontakt_telefont}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajSliku  = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let nova_slika=req.body.nova_slika;
        
        pacijent.collection.updateOne({'kor_ime':kor_ime},{$set:{'slika':nova_slika}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    dodajPacijenta=(req:express.Request, res:express.Response)=>{
        let noviPacijent=new pacijent(req.body)

        noviPacijent.save().then((noviPacijent)=>{
            res.status(200).json({'poruka':'pacijent je dodat'})
        }).catch((err)=>{
            res.status(400).json({'poruka':err})
        })
    }

    obrisiPacijenta=(req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;

    pacijent.collection.deleteOne({ 'kor_ime': kor_ime})
    res.json({ 'poruka': 'ok' })
    }
}