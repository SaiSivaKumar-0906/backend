const express = require('express')

const app = express()

const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/chat-login")

const models = require("./models/moongose")


app.use("/frontend", express.static("frontend"))

app.use(express.json())
app.post("/server/get-data", async (req, res)=>{
    let username = req.body
    console.log(username)
    let test = await models.create(username)
    console.log(test)
})

app.listen(9696, ()=>{
    console.log('localhost:9696/frontend/one.html')
})