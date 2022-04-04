const express = require('express')

const app = express()

const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/chat-login")

const models = require("./models/moongose")

const bycrypt = require("bcryptjs")


app.use("/frontend", express.static("frontend"))

app.use(express.json())
app.post("/server/get-data", async (req, res)=>{
    const {username, password : letters}= req.body
    const password = await bycrypt.hash(letters, 10)
    const one = req.body
      try{
          const db = await models.create({
              username,
              password
          })
          console.log(db)
        }
      catch(error){
          console.log(error)
      }
      console.log(one)
})

app.listen(9696, ()=>{
    console.log('localhost:9696/frontend/one.html')
})
