import mongoose from "mongoose";

const Schema = mongoose.Schema

let Korisnik = new Schema(
    {
        kor_ime:{
            type:String
        },
        lozinka:{
            type:String
        },
        tip:{
            type:String
        }
    }
)

export default mongoose.model("Korisnik", Korisnik, "korisnici");