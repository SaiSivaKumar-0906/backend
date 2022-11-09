const mongoose = require("mongoose");

const models = mongoose.Schema({
    url:{
        type: String,
        require: true
    }, 
    tweleCharacters:{
        type: String,
        require: true
    },
    countNumber:{
        type: Number,
        require: true
    }
})

const dbs = mongoose.model("urls", models);

module.exports = dbs;