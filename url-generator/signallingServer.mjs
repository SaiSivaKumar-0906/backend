const os = require("node:os")
const http = require("node:http");
const mongoose = require("mongoose");
const db = require("./db/models")
mongoose.connect("mongodb://127.0.0.1/mailId-url")
const fs = require("node:fs");
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

wss.on("connection", connections)

const clients = new Array;

function connections(client){    
   clients.push(client);

   function endClient(){
      const post = clients.indexOf(client);
      clients.splice(post, 1);
      console.log("connection closed");
   }

   function responce(data){
      console.log(JSON.parse(data));
      brodcast(JSON.parse(data))
   }

   client.on('message', responce);
   client.on('close', endClient);
}


function brodcast(data){
   for(c in clients){
      clients[c].send(JSON.stringify(data))
   }
}


app.listen(9966, ()=>{
   console.log(8080)
})

