const mongoose = require("mongoose");

const models = mongoose.Schema({
    url:{
        type: String,
        unique: true
    }, 
})

const dbs = mongoose.model("urls", models);

module.exports = dbs;
