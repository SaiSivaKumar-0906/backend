const http = require("http");

const fs = require("fs")

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

    if(!username){
        res.write(JSON.stringify({message:"wirte the username"}))
    }
    
    if(!password){
        res.write(JSON.stringify({messgae:"write the password"}))
    }

    try{
        if(username === String){
            res.write(JSON.stringify({message:"username must be string"}))
         const db = await models.create({
            username,
            password
        })
         if(db === username,password){
            res.write(JSON.stringify({messgae:"account created"}))
            console.log({username, password}, db)
        }
        }else{
          res.write(JSON.stringify({message:"username must be string"}))
        }
    }
    catch(error){
        if(error.code === 11000){
            res.write(JSON.stringify({message:"username already taken"}))
        }
    }
}
    fs.readFile(`${__dirname}/login/index.html`, (err, data)=>{
        if(err){
            console.log(err)
        }else{
            res.end(data);
        }
    })
})

app.listen(9966, ()=>{
    console.log("http://192.168.0.129:9966")
})
