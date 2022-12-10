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
      return;
    }catch{
      throw err;
    }
  })
} 

async function CreatingUser(res){
  const urlParse  = url.parse(crypto.randomUUID());
  const urlPathName = urlParse.pathname;
  try{
    const dbs = await db.create({
      url: `/users/${urlPathName}`, 
    })
  }catch(err){
    throw err;
  }
  res.writeHead(201, {
    "Content-Type": "text/html",
    "Location": `http:192.168.0.110:8080/users/${urlPathName}`, 
  })
  res.write(`http://192.168.0.110:8080/users/${urlPathName}`)
  res.end()
  return;
}

async function WebSocketFile(req, res){
  const ip = req.socket.remoteAddress;
  const find = await db.findOne({"url":req.url});
  find.ip.push(ip);
  if(find.ip.length >= 3){
    find.ip.splice(2);
    find.save();
  }
  console.log(find);
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
  console.log(req.url);
  const serach = await db.findOne({"url":req.url});

  if(req.url === "/" && req.method === "GET"){
    return IndexFile(res); 
  }

  if(req.url === "/redirects" && req.method === "GET"){
    return CreatingUser(res);
  }

  if(await db.findOne({"url":req.url})){
    return WebSocketFile(req, res);
  }

  if(!await db.findOne({"url":req.url})){
    return fourOfour(res);
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
