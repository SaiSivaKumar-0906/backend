const mongoose = require("mongoose");

const models = mongoose.Schema({
    mail : {
        type:String,
        require:true
    },
    urlPathname:{
        type:String,
        require:true
    },
    ipAddress:{
        type:String,
        require:true
    }
})
const Schema = mongoose.model("host-info", models);

module.exports = Schema;
