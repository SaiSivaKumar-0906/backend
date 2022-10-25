const http = require("node:http");
const { WebSocketServer } = require("ws");
const ws = require("ws")
const WebSocket = require("ws");
const fs = require("node:fs")
const crypto = require("node:crypto");
const url = require("node:url");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:/websocket-url")
const db = require("../chat/db/urlDB")

const app  = http.createServer(async(req, res)=>{

  if(req.url === "/" && req.method === "GET"){
    fs.readFile(`${__dirname}/public/index.html` , (err, data)=>{
      try{
        res.end(data)
      }catch{
        throw err
      }
    })
  } 

  if(req.url === "/redirects" && req.method === "GET"){
    const urlParse  = url.parse(crypto.randomUUID())

    const urlPathName = urlParse.pathname;

    res.writeHead(307, {
      "Location": `/users/${urlPathName}`, 
    })
    res.end();

    try{
      const dbs = await db.create({
        url: `users/${urlPathName}`
      })
      console.log(dbs)
    }catch(err){
      throw err;
    }
  }

  if(await db.find({url: req.url}) === req.url && req.method === "GET"){
    res.writeHead(200, {
      "Content-type": "text/html",
    })
    fs.readFile(`${__dirname}/public/websocket.html`, (err, data)=>{
      try {
        res.write(data);
        res.end();
      }catch{
        throw err;
      }
    })
  }

});

  const wss = new WebSocketServer({
    server: app
  })

  const array = new Array();

  wss.on("connection", (ws)=>{
    array.push(ws)
    ws.on("message", (data)=>{
      const {message} = JSON.parse(data)
      wss.clients.forEach((client)=>{
        if(client.readyState === WebSocket.OPEN){
          client.send(JSON.stringify(message))
        }      
      })
      ws.on("close", removedclinet)
      console.log(message)
    })
  })


  function removedclinet(client){
    for(let i=0; i<array.length; i++){
      if(array[i] === client){
        array.splice(i, 1)
      }
    }
    console.log("disconnected")
  }

app.listen(8080, ()=>{
  console.log(80)
})
