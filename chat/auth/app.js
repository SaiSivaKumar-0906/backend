const http = require("node:http");
const db = require("../db/authDb").db;
const mongoose = require("mongoose");
const fs = require("node:fs")
mongoose.connect(atlasUrl).then(()=>{
    console.log("db connected!!");
}).catch((err)=>{
    throw err;
})

async function Post(req, res){
    const PostData = [];
    for await(const data of req){
        PostData.push(data);
    }
    const {username, password} = JSON.parse(Buffer.concat(PostData).toString());
    if(!(username && password)){
        res.writeHead(404, {
            "Content-Type": "application/json"
        })
        res.write(JSON.stringify("you must have forgotten username or password!!"));
        res.end();
        return;
    }
    try{
        const userData = await db.create({
            username,
            password
        })
        if(userData){
            res.writeHead(201, {
                "Content-Type": "application/json"
            })
            res.write(JSON.stringify("created!!"));
            res.end();
            return;
        }
    }catch(err){
        if(err.code === 11000){
            res.writeHead(404, {
                "Content-Type": "application/json"
            })
            res.write(JSON.stringify("username already exist!!"));
            res.end();
        }
    }
}

const app = http.createServer((req, res)=>{
    if(req.method === "POST" && req.url === "/user/info"){
        Post(req, res);
    }
})

app.listen(80, ()=>{
    console.log(80)
})
