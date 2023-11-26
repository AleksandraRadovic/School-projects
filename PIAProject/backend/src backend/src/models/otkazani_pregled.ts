import mongoose from "mongoose";

const Schema = mongoose.Schema

let OtkazaniPregled = new Schema(
    {
        IDzp:{
            type:Number
        },
        obrazlozenje:{
            type:String
        }
    }
)

export default mongoose.model("OtkazaniPregled", OtkazaniPregled, "otkazani_pregledi")