const http = require("http");

const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1/live-login")

const models = require("./models")

const app = http.createServer(async(req, res)=>{
    const postData = [];
    if(req.url === "/post/data" && req.method === "POST"){
    for await(const chunk of req){
        postData.push(chunk)
    }
    const {username, password} = JSON.parse(Buffer.concat(postData).toString());
    if(!(username && password)){
        res.write(JSON.stringify({error: "wirte username or password"}))
    }
    try{
        const db = await models.create({
            username,
            password
        })
        res.write(JSON.stringify(
            {
                status: "account created"
            }))

        console.log(db)
    }
    catch(error){
        if(error.code === 11000){
            res.write(JSON.stringify(
            {
                error : "username already taken"
            }))
        }
        
    }
    console.log({username, password})
    res.end();
}
})

app.listen(9966, ()=>{
    console.log(9966)
})
