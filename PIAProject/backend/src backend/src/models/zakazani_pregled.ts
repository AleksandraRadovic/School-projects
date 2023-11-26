import mongoose from "mongoose";

const Schema = mongoose.Schema

let ZakazaniPregled = new Schema(
    {
        idZP:{
            type:Number
        },
        pregled:{
            type:String
        },
        pacijent:{
            type:String
        },
        lekar:{
            type:String
        },
        status:{
            type:String
        },
        datum:{
            type:String
        },
        krajPregleda:{
            type:Number
        },
        pocetakPregleda:{
            type:Number
        },
        vreme:{
            type:String
        }
        
        
    }
)

export default mongoose.model("ZakazaniPregled", ZakazaniPregled, "zakazani_pregledi")