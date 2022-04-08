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
    if(!username || typeof username !== "string"){
          return res.json(
              {status : 'error', 
          error : 'username not there'})
    }
    if(!letters || typeof letters !== "string"){
        return res.json(
            {status : 'error', 
            error : "wrong password"})
    }
    if(letters.length < 4){
        return res.json(
            {status : "error", 
        error : "password length weak"})
    }
    const one = req.body
      try{
          const db = await models.create({
              username,
              password
          })
          console.log(db)
        }
      catch(error){
          if(error.code === 11000){
                return res.json({ status: "error", error : "username already taken"})
          }else if(error.code !== 11000){
              return res.json({status : "ok"})
          }
      }
      console.log(one)
})

app.listen(9696, ()=>{
    console.log('localhost:9696/frontend/one.html')
})
