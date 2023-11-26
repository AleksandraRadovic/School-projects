import mongoose from "mongoose";

const Schema = mongoose.Schema

let IzvestajPacijenta = new Schema(
    {
        idI:{
            type:Number
        },
        zpID:{
            type:Number
        },
        razlog_dolaska:{
            type:String
        },
        dijagnoza:{
            type:String
        },
        preporucena_terapija:{
            type:String
        },
        datum_kontrole:{
            type:String
        },
        pacijent:{
            type:String
        }
    }
)

export default mongoose.model("IzvestajPacijenta", IzvestajPacijenta, "izvestaji_pacijenata")