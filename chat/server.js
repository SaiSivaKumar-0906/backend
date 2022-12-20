const http = require("node:http");
const authFunction = require("../chat/auth/app").auth
const { WebSocketServer } = require("ws");
const ws = require("ws")
const WebSocket = require("ws");
const fs = require("node:fs")
const crypto = require("node:crypto");
const db = require("./db/authDb").db
const mongoose = require("mongoose");
mongoose.connect(AtlasUrl)
 .then(()=>{
  console.log("conneted to db")
}).catch((err)=>{
  console.log(err);
})

function IndexFile(res){
  return fs.readFile(`${__dirname}/public/index.html` , (err, data)=>{
    if(err){
      throw err
    }
    if(data){
      res.writeHead(200, {
        "Content-Type": "text/html"
      })
      res.write(data);
      res.end()
    }
  })
} 

function WebSocketFile(res){  
  res.writeHead(200, {
    "Content-type": "text/html", 
  })
  return fs.readFile(`${__dirname}/public/websocket.html`, (err, data)=>{
    try {
      res.write(data);
      res.end();
    }catch{
      throw err;    
    }
  })
}

function fourOfour(res){
  res.writeHead(404, {
    "Content-Type": "text/html"
  })
  res.write("Does not exist");
  res.end();
  return;
}

const app  = http.createServer(async(req, res)=>{
  if(req.url === "/" && req.method === "GET"){
    return IndexFile(res); 
  }

  if(req.method === "GET" && req.url === "/websocketFile"){
    return WebSocketFile(req, res);
  }

  // if(req.method === "GET" && !await db.findOne({"url":req.url})){
  //   return fourOfour(res);
  // }

  if(req.url === "/user/info" && req.method === "POST"){
    authFunction(req, res, db);
  }
});


const wss = new WebSocketServer({
  server: app,
})

wss.brodcast = function brodcast(messages){
  try{
    wss.clients.forEach((clients)=>{
      if(clients.readyState === WebSocket.OPEN){
        clients.send(messages.toString())
      }
    })
  }catch(e){
    console.log(e);
  }
}

wss.on("connection", (ws)=>{
  ws.on("message", (data)=>{
    const {webSocketMessages} = JSON.parse(data); 
    if(!webSocketMessages){
      return;
    } 
    console.log(webSocketMessages) 
    wss.brodcast(JSON.stringify({webSocketMessages}));
  })
})

app.listen(80, ()=>{
  console.log(80)
})
