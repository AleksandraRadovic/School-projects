import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Lekar = new Schema(
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
        br_lek_licence:{
            type:String
        },
        specijalizacija:{
            type:String
        },
        ogranak_ordinacije:{
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

export default mongoose.model("Lekar", Lekar, "lekari");