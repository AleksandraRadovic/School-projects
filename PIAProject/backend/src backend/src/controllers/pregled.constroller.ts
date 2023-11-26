import express from 'express'
import pregled from '../models/pregled'

export class PregledController{
    dohvatiPregledeLekara=(req:express.Request, res:express.Response)=>{
        let specijalizacija= req.body.specijalizacija

        pregled.find({'specijalizacija':specijalizacija, "status":"validan"}, (err, pregledi)=>{
            if(err) console.log(err)
            else res.json(pregledi)
        })
    }

    dodajNoviPregled=(req:express.Request,  res:express.Response)=>{
        let noviPregled=new pregled(req.body)

        noviPregled.save().then((noviPregled)=>{
            res.status(200).json({'poruka':'pregled je dodat'})
        }).catch((err)=>{
            res.status(400).json({'poruka':err})
        })
    }

    dohvatiSvePreglede=(req:express.Request, res:express.Response)=>{
        pregled.find({}, (err, pregledi)=>{
            if(err) console.log(err)
            else res.json(pregledi)
        })
    }

    dohvatiNeobradjenePreglede= (req:express.Request, res:express.Response)=>{
        pregled.find({"status":"neobradjeno"}, (err, pregledi)=>{
            if(err) console.log(err)
            else res.json(pregledi)
        })
    }

    odbijPregled = (req:express.Request, res:express.Response)=>{
        let idP= req.body.idP
        pregled.collection.updateOne({'idP':idP},{$set:{'status':"nevalidan"}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    odobriPregled = (req:express.Request, res:express.Response)=>{
        let idP= req.body.idP
        pregled.collection.updateOne({'idP':idP},{$set:{'status':"validan"}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajNazivPregleda  = (req:express.Request, res:express.Response)=>{
        let idP=req.body.idP;
        let novi_naziv=req.body.novi_naziv;
        
        pregled.collection.updateOne({'idP':idP},{$set:{'naziv':novi_naziv}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    azurirajCenuPregleda  = (req:express.Request, res:express.Response)=>{
        let idP=req.body.idP;
        let nova_cena=req.body.nova_cena;
        
        pregled.collection.updateOne({'idP':idP},{$set:{'cena':nova_cena}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    dohvatiPregledIdP= (req:express.Request, res:express.Response)=>{
        let idP=req.body.idP

        pregled.findOne({"idP":idP}, (err, pregled)=>{
            if(err) console.log(err)
            else res.json(pregled)
        })
    }
}