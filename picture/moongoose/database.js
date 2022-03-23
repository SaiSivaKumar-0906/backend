const mongoose = require('mongoose')


const shcemas =  mongoose.Schema({
    images : {
        type : JSON,
    },
    number : {
        type : Number,
        required : true,
        default : Date.now(),
    },
});

const one = mongoose.model("images", shcemas)

module.exports= one