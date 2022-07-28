const http = require("http");

const fs = require("fs")

const path = require("path")

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/live-login");

const models = require("./models");

const app = http.createServer(async(req, res)=>{    
    const postData = [];

    if(req.url === "/api/login" && req.method === "POST"){
    for await(const bufferData of req){
        postData.push(bufferData)
    } 

    const {username, password} = JSON.parse(Buffer.concat(postData).toString());

    if(!(username&&password)){
        res.write(JSON.stringify({message:"you must be forgot to write username or password"}));
    }
    
    try{
        if(/^[A-Za-z0-9 -]*$/.test(username)){
        const db = await models.create({
            username,
            password
        })
         if(db === username,password){
            res.end(JSON.stringify({messgae:"account created"}))
            console.log({username, password}, db)
        }
    }else{
        res.end(JSON.stringify({message:"special symbols not allowed"}))
    }
    }
    catch(error){
        if(error.code === 11000){
            res.end(JSON.stringify({message:"username already taken"}))
        }
    }
}
    if(req.url === "/login" && req.method === "GET"){
    fs.readFile(path.join(`${__dirname}/login/index.html`), (err, data)=>{
        if(err){
                console.log(err)
        }else{
                res.end(data)
        }
    })
}
})

app.listen(9966, ()=>{
    console.log("http://192.168.0.129:9966")
})
