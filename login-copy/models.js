const moongoose = require("mongoose");

const models = moongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true

    },
    password:{
        type :String,
    }
})

const schema = moongoose.model("login", models);

module.exports = schema;
