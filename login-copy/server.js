const http = require("http");

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
        res.write(JSON.stringify({message:"wirte the username or password"}))
    }

    try{
        const db = await models.create({
            username,
            password
        })
        if(db === username,password){
            res.write(JSON.stringify({messgae:"account created"}))
            console.log({username, password}, db)
        }
    }
    catch(error){
        if(error.code === 11000){
            res.write(JSON.stringify({message:"username already taken"}))
        }
    }

}
res.end();
})

app.listen(9966, ()=>{
    console.log(9966)
})
