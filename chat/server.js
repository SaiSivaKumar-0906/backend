const http = require("node:http");
const { WebSocketServer } = require("ws");
const ws = require("ws")
const WebSocket = require("ws");
const fs = require("node:fs")
const crypto = require("node:crypto");
const url = require("node:url");
const db = require("../chat/db/urlDB");
const mongoose = require("mongoose");
const AtlasUrl = "mongodb+srv://siva:CGTWZAanEwmYoUp8@cluster0.zdt5qfc.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(AtlasUrl)
 .then(()=>{
  console.log("conneted to db")
}).catch((err)=>{
  console.log(err);
})

function IndexFile(res){
  return fs.readFile(`${__dirname}/public/index.html` , (err, data)=>{
    try{
      res.writeHead(200, {
        "Content-Type": "text/html"
      })
      res.write(data);
      res.end();
    }catch{
      throw err
    }
  })
} 

async function CreatingUser(res){
  const urlParse  = url.parse(crypto.randomUUID());
  const urlPathName = urlParse.pathname;   
  res.writeHead(307, {
    "Location": `/users/${urlPathName}`, 
  })
  res.end();
  try{
    const dbs = await db.create({
      url: `/users/${urlPathName}`, 
    })
    console.log(dbs)
  }catch(err){
    throw err;
  }
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
}

const app  = http.createServer(async(req, res)=>{
  if(req.url==="/" && req.method === "GET"){  
    IndexFile(res);
  }

  if(req.url === "/redirects" && req.method === "GET"){
    CreatingUser(res);
  }

  if(await db.findOne({"url":req.url})){
    WebSocketFile(res);
  }

  if(!await db.findOne({"url":req.url})){
    fourOfour(res);
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

app.listen(8080, ()=>{
  console.log(80)
})
