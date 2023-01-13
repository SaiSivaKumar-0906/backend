const mongoose = require("mongoose");

const models = mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true
    },
    hashedPassword:{
        type: String, 
        require: true
    },
    url:{
        type: String,
        require: true
    },
})

const dbs = mongoose.model("atuh", models);
module.exports.db = dbs
