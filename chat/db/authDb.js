const mongoose = require("mongoose");

const models = mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true
    },
    hasedPassword:{
        type: String, 
        require: true
    }
})

const dbs = mongoose.model("atuh", models);
module.exports.db = dbs
