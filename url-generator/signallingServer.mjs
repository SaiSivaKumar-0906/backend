const os = require("node:os")
const http = require("node:http");
const mongoose = require("mongoose");
const db = require("./db/models")
const socketMessages = require("./db/sockets")
mongoose.connect("mongodb://127.0.0.1/mailId-url")
const fs = require("node:fs");
const {WebSocketServer} = require("ws");
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
   ws.on("message", (data, isBinary)=>{
      try{
         const {input} = JSON.parse(data);

         console.log({input})

         for(const client of wss.clients){
            if(client.readyState === WebSocket.OPEN){
               client.send(JSON.stringify({
                  input
               }), {binary: isBinary})
            }
         }
      }catch(e){
         ws.send(JSON.stringify("server has blown away for some reason"))
      }
   })
})

function heartbeat(){
   this.isAlive = true;
}

wss.on("connection", function connection(ws){
   ws.isAlive = true;
   ws.on('pong', heartbeat);
})

const interval = setInterval(function ping(){
   wss.clients.forEach(function each(ws){
      if(ws.isAlive === false) return ws.terminate();

      ws.isAlive = false;
      ws.ping();
      console.log("user got disconnected")
   })
}, 30000);

wss.on('close', function close(){
   clearInterval(interval)
})

app.listen(9966, ()=>{
   console.log(9966)
})
