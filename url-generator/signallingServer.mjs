const os = require("node:os")
const http = require("node:http");
const mongoose = require("mongoose");
const db = require("./db/models")
mongoose.connect("mongodb://127.0.0.1/mailId-url")
const fs = require("node:fs");
const { WebSocketServer } = require("ws");


const app = http.createServer(async(req, res)=>{
    if(await db.findOne({urlPathname: req.url}) && req.method === "GET"){
       fs.readFile(`${__dirname}/public/create.html`, (err, data)=>{
         if(err){
            console.log(err)
         }else{
            res.end(data)
         }
       })        
    }
})

const wss = new WebSocketServer({port: 8080})

wss.on("connection", (ws)=>{
   console.log("user connected");

   ws.on("message", (data)=>{
       let {one} = JSON.parse(data.toString())
      console.log({one});
      ws.send(JSON.stringify({one}))
   })
})



app.listen(9966, ()=>{
    console.log(8080)
})

