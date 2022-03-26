const moongoose = require("mongoose")

const models = moongoose.Schema({
    images : {
        type : JSON,
    },
    time : {
        type : Number,
        default : Date.now
    }
})

const shema = moongoose.model("images", models)

module.exports = shema
