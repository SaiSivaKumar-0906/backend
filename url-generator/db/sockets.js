const mongoose = require("mongoose");

const models = mongoose.Schema({
   data:{
    type: String,
    require: true
   }
})
const Schema = mongoose.model("socket-messages", models);

module.exports = Schema;