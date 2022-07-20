const moongoose = require("mongoose")


const models = moongoose.Schema({
    username: {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String
    }
})

const shema = moongoose.model("information", models)

module.exports = shema