import mongoose  from "mongoose";

const Schema = mongoose.Schema

let LekariPregledi = new Schema(
    {
        lekar:{
            type:String
        },
        IDp:{
            type:Number
        }
    }
)

export default mongoose.model('LekariPregledi', LekariPregledi, "lekari_pregledi")