const express = require('express')

const app = express()

const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/chat-login")

const models = require("./models/moongose")

const bycrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const JWTSCERET = "sdfoajsdifasdfoisdjfisdkj#ksdfjoasdfkljdsjj@!djoajfijadsjdsoi"

app.use("/frontend", express.static("frontend"))

app.use(express.json())

app.post("/api/login", async(req, res)=>{
    const {username, password} = req.body;

    const db = await models.findOne({username}).lean()

    if(!db){
        return res.json({status : "erorr", error : "username/password might be wrong!!"})
    }

    if(await  bycrypt.compare(password, db.password)){
        const token = jwt.sign({
             id : models._id , 
             username : models.username  }, JWTSCERET) 

        return res.json({status : "ok", data : token})
    }
    res.json({status : "erorr", error : "username/password might be wrong!!"})

})

app.post("/api/change-password", async (req, res)=>{
    const {token, newpassword :letters} = req.body
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
    try{
        const user = jwt.verify(token, JWTSCERET)
        const id = user.id
        const password = await bycrypt.hash(letters)
        await models.updateOne({id}, {
            $set  : { password }
        }
        )

    }catch (error){
       res.json({ status : "ok" , error : "something went wrong"})
    }
})

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
