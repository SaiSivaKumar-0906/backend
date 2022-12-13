const http = require("node:http");
const db = require("../db/authDb").db;
const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const slatRounds = 10;
const temp = "mongodb://127.0.0.1/temp-pass"
mongoose.connect(temp || atlasUrl).then(()=>{
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
    bycrypt.genSalt(slatRounds, (err, salt)=>{
        bycrypt.hash(password, salt, async(err, hasedPassword)=>{
            if(err){
                throw err;
            }
            try{
               const userData = await db.create({
                  username, 
                  hasedPassword
               })
               if(userData){
                console.log(userData);
                res.writeHead(201, {
                   "Content-Type": "application/json"
                })
                res.write(JSON.stringify("created!!"));
                res.end();
               }
            }
            catch(err){
                if(err.code === 11000){
                    res.writeHead(404, {
                        "Content-Type": "application/json"
                    })
                    res.write(JSON.stringify("username already exist!!"));
                    res.end();
                }
            }
        })
    })
}

const app = http.createServer((req, res)=>{
    if(req.method === "POST" && req.url === "/user/info"){
        Post(req, res);
    }
})

app.listen(80, ()=>{
    console.log(80)
})
