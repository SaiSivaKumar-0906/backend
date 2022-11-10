const mongoose = require("mongoose");

const models = mongoose.Schema({
    url:{
        type: String,
        require: true
    }, 
})

const dbs = mongoose.model("urls", models);

module.exports = dbs;
