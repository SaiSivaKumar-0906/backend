
import moongoose, {mongoose} from "mongoose"


const models = moongoose.Schema({
    message:{
        type : String,
    }
})

export const shema = moongoose.model("socket-chat", models)
