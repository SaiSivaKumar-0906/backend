const os = require("node:os")
const http = require("node:http");
const mongoose = require("mongoose");
const db = require("./db/models")
mongoose.connect("mongodb://127.0.0.1/mailId-url")
const fs = require("node:fs");
const path = require("node:path")
const {WebSocketServer} = require("ws")
const WebSocket = require("ws");


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

const wss = new WebSocketServer({
   server: app
})

wss.on("connection", (ws)=>{
   console.log("user connected");

   ws.on("message", (data, isBinary)=>{
      let {input} = JSON.parse(data.toString())
      console.log({input});
      wss.clients.forEach(function each(client){
         if(client.readyState === WebSocket.OPEN){
            client.send(JSON.stringify({input}), {binary: isBinary})
         }
      })
   })
})

app.listen(9966, ()=>{
   console.log(8080)
})

