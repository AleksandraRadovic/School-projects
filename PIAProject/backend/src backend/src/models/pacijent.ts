import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Pacijent = new Schema(
    {
        kor_ime:{
            type:String
        },
        lozinka:{
            type:String
        },
        ime:{
            type:String
        },
        prezime:{
            type:String
        },
        adresa:{
            type:String
        },
        kontakt_telefont:{
            type:String
        },
        email:{
            type:String
        },
        slika:{
            type:String
        }
    }
)

export default mongoose.model("Pacijent", Pacijent, "pacijenti");