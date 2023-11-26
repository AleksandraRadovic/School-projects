import mongoose from "mongoose";

const Schema = mongoose.Schema

let Pregled = new Schema(
    {
        idP:{
            type:Number
        },
        specijalizacija:{
            type:String
        },
        naziv:{
            type:String
        },
        trajanje:{
            type:Number
        },
        cena:{
            type:String
        },
        status:{
            type:String
        }
    }
)

export default mongoose.model("Pregled", Pregled, 'pregledi')