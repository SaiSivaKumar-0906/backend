const mongoose = require("mongoose");

const models = mongoose.Schema({
    url:{
        type: String,
        unique: true
    }, 
    ip:{
        type: Array, 
        require: true
    }
})

const dbs = mongoose.model("urls", models);

module.exports = dbs;
