const os = require("node:os")
const http = require("node:http");
const mongoose = require("mongoose");
const db = require("./db/models")
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


app.listen(9966, ()=>{
   console.log(9966)
})
