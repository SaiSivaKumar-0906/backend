const http = require("http");

const fs = require("fs")

const path = require("path")

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/live-login");

const models = require("./models");

const app = http.createServer(async(req, res)=>{  
    const postData = [];

    if(req.url === "/api/create" && req.method === "POST"){
    for await(const bufferData of req){
        postData.push(bufferData)
    } 

    const {username, password} = JSON.parse(Buffer.concat(postData).toString());

    if(!(username&&password)){
        res.end(JSON.stringify({oops:"you must be forgot to write username or password"}));
    }
    
    try{
        if(/^[A-Za-z0-9]*$/.test(username)){
        const db = await models.create({
            username,
            password
        })
         if(db === username,password){
            res.end(JSON.stringify({messgae:"account created, now login"}))
            console.log({username, password}, db)
        }
    }else{
        res.end(JSON.stringify({oops:"special symbols and spaces are not allowed"}))
    }
    }
    catch(error){
        if(error.code === 11000){
            res.end(JSON.stringify({oops:"username already taken"}))
        }
    }
} 
if(req.url ==="/login" && req.method === "GET"){
    fs.readFile(path.join(`${__dirname}/login/login.html`), (err, data)=>{
        if(err){
            console.log(err)
        }else{
            res.end(data)
        }
    })
}
    if(req.url==="/create" && req.method === "GET"){
    fs.readFile(path.join(`${__dirname}/login/index.html`), (err, data)=>{
        if(err){
                console.log(err)
        }else{
                res.end(data)
        }
    })
}
})

app.listen(80, ()=>{
    console.log("http://192.168.0.129:80")
})
