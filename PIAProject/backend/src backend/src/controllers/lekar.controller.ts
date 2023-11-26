import express from 'express';
import lekar from '../models/lekar';
import specijalizacija from '../models/specijalizacija';
import lekari_pregledi from '../models/lekari_pregledi';

export class LekarController{
    
    dohvatiSveLekare = (req:express.Request, res:express.Response)=>{
        lekar.find({}, (err, lekari)=>{
            if(err) console.log(err)
            else res.json(lekari)
        })
    }

    promeniLozinkuLekaru =(req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let lozinka=req.body.lozinka;
        
        lekar.collection.updateOne({'kor_ime':kor_ime},{$set:{'lozinka':lozinka}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    dohvatiLekaraKorIme = (req:express.Request, res:express.Response)=>{
        let kor_ime= req.body.kor_ime

        lekar.findOne({'kor_ime':kor_ime}, (err, lekar)=>{
            if(err) console.log(err)
            else res.json(lekar)
        })
    }

    obrisiLekara=(req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;

    lekar.collection.deleteOne({ 'kor_ime': kor_ime})
    res.json({ 'poruka': 'ok' })
    }

    azurirajKorIme = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let novo_kor_ime=req.body.novo_kor_ime;
        
        lekar.collection.updateOne({'kor_ime':kor_ime},{$set:{'kor_ime':novo_kor_ime}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajLozinku  = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let nova_lozinka=req.body.nova_lozinka;
        
        lekar.collection.updateOne({'kor_ime':kor_ime},{$set:{'lozinka':nova_lozinka}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajIme  = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let novo_ime=req.body.novo_ime;
        
        lekar.collection.updateOne({'kor_ime':kor_ime},{$set:{'ime':novo_ime}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajPrezime  = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let novo_prezime=req.body.novo_prezime;
        
        lekar.collection.updateOne({'kor_ime':kor_ime},{$set:{'prezime':novo_prezime}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajAdresu  = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let nova_adresa=req.body.nova_adresa;
        
        lekar.collection.updateOne({'kor_ime':kor_ime},{$set:{'adresa':nova_adresa}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajKontaktTelefont  = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let novi_kontakt_telefont=req.body.novi_kontakt_telefont;
        
        lekar.collection.updateOne({'kor_ime':kor_ime},{$set:{'kontakt_telefon':novi_kontakt_telefont}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajBrLekLicence  = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let novi_br_lek_licence=req.body.novi_br_lek_licence;
        
        lekar.collection.updateOne({'kor_ime':kor_ime},{$set:{'br_lek_licence':novi_br_lek_licence}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajSpecijalizaciju  = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let nova_specijalizacija=req.body.nova_specijalizacija;
        
        lekar.collection.updateOne({'kor_ime':kor_ime},{$set:{'specijalizacija':nova_specijalizacija}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajSliku  = (req:express.Request, res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let nova_slika=req.body.nova_slika;
        
        lekar.collection.updateOne({'kor_ime':kor_ime},{$set:{'slika':nova_slika}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    dohvatiSveSpecijalizacije=(req:express.Request, res:express.Response)=>{
        specijalizacija.find({}, (err, specijalizacije)=>{
            if(err) console.log(err)
            else res.json(specijalizacije)
        })
    }

    dodajLekara = (req:express.Request, res:express.Response)=>{
        let noviLekar=new lekar(req.body)

        noviLekar.save().then((noviLekar)=>{
            res.status(200).json({'poruka':'lekar je dodat'})
        }).catch((err)=>{
            res.status(400).json({'poruka':err})
        })
    }

    dodajSpecijalizaciju = (req:express.Request, res:express.Response)=>{
        let novaSpecijalizacija=new specijalizacija(req.body)

        novaSpecijalizacija.save().then((novaSpecijalizacija)=>{
            res.status(200).json({'poruka':'specijalizacija je dodata'})
        }).catch((err)=>{
            res.status(400).json({'poruka':err})
        })
    }
     dohvatiLekaraEmail=(req:express.Request, res:express.Response)=>{
        let email=req.body.email

        lekar.findOne({'email':email}, (err, lekar)=>{
            if(err) console.log(err)
            else res.json(lekar)
        })
     }

     dohvatiMojeIzabranePreglede = (req:express.Request, res:express.Response)=>{
        let lekar = req.body.lekar

        lekari_pregledi.find({"lekar":lekar}, (err, data)=>{
            if(err) console.log(err)
            else res.json(data)
        })
     }

     izbaciMojeVrstePregleda=(req:express.Request, res:express.Response)=>{
        let lekar=req.body.lekar;
        lekari_pregledi.collection.deleteMany({"lekar":lekar})
        res.json({ 'poruka': 'ok' })
        
     }

     ubaciMojeVrstePregleda=(req:express.Request, res:express.Response)=>{
        let noviPregled=new lekari_pregledi(req.body)

        noviPregled.save().then((noviPregled)=>{
            res.status(200).json({'poruka':'pregled za lekara je dodat'})
        }).catch((err)=>{
            res.status(400).json({'poruka':err})
        })
     }

     azurirajKorImeLekariPregledi = (req:express.Request, res:express.Response)=>{
        let lekar=req.body.lekar;
        let novi_lekar=req.body.novi_lekar;
        
        lekari_pregledi.collection.updateOne({'lekar':lekar},{$set:{'lekar':novi_lekar}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }
}