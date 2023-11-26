import express from 'express'
import izvestaj_pacijenta from '../models/izvestaj_pacijenta'

export class IzvestajPacijentaController{
    dohvatiIzvestajePacijenta = (req:express.Request, res:express.Response)=>{
        let pacijent = req.body.pacijent

        izvestaj_pacijenta.find({"pacijent":pacijent}, (err, izvestaji)=>{
            if(err) console.log(err)
            else res.json(izvestaji)
        })
    }

    dodajIzvestaj = (req:express.Request, res:express.Response)=>{
        let noviIzvestaj=new izvestaj_pacijenta(req.body)

        noviIzvestaj.save().then((noviIzvestaj)=>{
            res.status(200).json({'poruka':'izvestaj je dodat'})
        }).catch((err)=>{
            res.status(400).json({'poruka':err})
        })
    }

    dohvatiSveIzvestaje= (req:express.Request, res:express.Response)=>{
        izvestaj_pacijenta.find({}, (err, izvestaji)=>{
            if(err) console.log(err)
            else res.json(izvestaji)
        })
    }

    azurirajPacijenta = (req:express.Request, res:express.Response)=>{
        let idI=req.body.idI;
        let novi_pacijent=req.body.novi_pacijent;
        
        izvestaj_pacijenta.collection.updateOne({'idI':idI},{$set:{'pacijent':novi_pacijent}},(err, k)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }
}