const moongoose = require("mongoose")


const models = moongoose.Schema({
    username: {
        type : String
    },
    password : {
        type : String
    }
})

const shema = moongoose.model("images", models)

module.exports = shema