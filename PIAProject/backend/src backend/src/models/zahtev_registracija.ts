import mongoose from "mongoose";

const Schema =  mongoose.Schema;

let ZahtevRegistracija = new Schema(
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
        kontakt_telefon:{
            type:String
        },
        email:{
            type:String
        },
        slika:{
            type:String
        },
        status:{
            type:String
        }
    }
)

export default mongoose.model("ZahtevRegistracija", ZahtevRegistracija, "zahtevi_registracija")