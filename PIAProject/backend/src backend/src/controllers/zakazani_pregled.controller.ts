import express from "express";
import zakazani_pregled from "../models/zakazani_pregled";
import otkazani_pregled from "../models/otkazani_pregled";

export class ZakazaniPregledController{

    dohvatiZakazanePregledePacijenta=(req:express.Request, res:express.Response)=>{
        let pacijent = req.body.pacijent

        zakazani_pregled.find({'pacijent':pacijent, 'status':"zakazano"}, (err, zakazani_pregledi)=>{
            if(err) console.log(err)
            else res.json(zakazani_pregledi)
        })
    }

    dohvatiZakazaniPregledId = (req:express.Request, res:express.Response)=>{
        let idZP = req.body.idZP

        zakazani_pregled.findOne({"idZP":idZP}, (err, zakazani_pregled)=>{
            if(err) console.log(err)
            else res.json(zakazani_pregled)
        })
    }

    otkaziPregledId = (req:express.Request, res:express.Response)=>{
        let idZP = req.body.idZP

        zakazani_pregled.collection.updateOne({'idZP':idZP},{$set:{'status':"otkazano"}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    dohvatiZakazanePregledeLekara=(req:express.Request, res:express.Response)=>{
        let lekar = req.body.lekar

        zakazani_pregled.find({'lekar':lekar, 'status':"zakazano"}, (err, zakazani_pregledi)=>{
            if(err) console.log(err)
            else res.json(zakazani_pregledi)
        })
    }

    obaviPregledId = (req:express.Request, res:express.Response)=>{
        let idZP = req.body.idZP

        zakazani_pregled.collection.updateOne({'idZP':idZP},{$set:{'status':"obavljeno"}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    dohvatiSveObavljenePregledeBezIzvestaja = (req:express.Request, res:express.Response)=>{
        let pacijent=req.body.pacijent
        let lekar = req.body.lekar

        zakazani_pregled.find({'pacijent':pacijent, "lekar":lekar, "status":"obavljeno"}, (err, zakazani_pregledi)=>{
            if(err) console.log(err)
            else res.json(zakazani_pregledi)
        })
    }

    napisiIzvestajId = (req:express.Request, res:express.Response)=>{
        let idZP = req.body.idZP

        zakazani_pregled.collection.updateOne({'idZP':idZP},{$set:{'status':"napisan izvestaj"}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajPacijenta = (req:express.Request, res:express.Response)=>{
        let idZP=req.body.idZP;
        let novi_pacijent=req.body.novi_pacijent;
        
        zakazani_pregled.collection.updateOne({'idZP':idZP},{$set:{'pacijent':novi_pacijent}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    dohvatiSvePregledePacijenta = (req:express.Request, res:express.Response)=>{
        let pacijent = req.body.pacijent

        zakazani_pregled.find({"pacijent":pacijent}, (err, zakazani_pregledi)=>{
            if(err) console.log(err)
            else res.json(zakazani_pregledi)
        })
    }

    azurirajLekara = (req:express.Request, res:express.Response)=>{
        let idZP=req.body.idZP;
        let novi_lekar=req.body.novi_lekar;
        
        zakazani_pregled.collection.updateOne({'idZP':idZP},{$set:{'lekar':novi_lekar}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    dohvatiSvePregledeLekara = (req:express.Request, res:express.Response)=>{
        let lekar = req.body.lekar

        zakazani_pregled.find({"lekar":lekar}, (err, zakazani_pregledi)=>{
            if(err) console.log(err)
            else res.json(zakazani_pregledi)
        })
    }

    dodajOtkazaniPregled = (req:express.Request, res:express.Response)=>{
        let otkazaniPregled=new otkazani_pregled(req.body)

        otkazaniPregled.save().then((zahotkazaniPregledtevPacijent)=>{
            res.status(200).json({'poruka':'otkazani_pregled je dodat'})
        }).catch((err)=>{
            res.status(400).json({'poruka':err})
        })
    }

    dodajZakazaniPregled = (req:express.Request, res:express.Response)=>{
        let zakazaniPregled=new zakazani_pregled(req.body)

        zakazaniPregled.save().then((zakazaniPregled)=>{
            res.status(200).json({'poruka':'zakazani_pregled je dodat'})
        }).catch((err)=>{
            res.status(400).json({'poruka':err})
        })
    }
    dohvatiSvePregledeZakazivanja = (req:express.Request, res:express.Response)=>{
        zakazani_pregled.find({}, (err, data)=>{
            if(err) console.log(err)
            else res.json(data)
        })
    }

    dohvatiZakazanePregledeLekaraZaOdredjeniDatum=(req:express.Request, res:express.Response)=>{
        let lekar = req.body.lekar
        let datum=req.body.datum
        zakazani_pregled.find({'lekar':lekar, 'status':"zakazano","datum":datum}, (err, zakazani_pregledi)=>{
            if(err) console.log(err)
            else res.json(zakazani_pregledi)
        })
    }

}