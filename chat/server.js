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
        url: `/users/${urlPathName}`, 
        tweleCharacters:  `/users/${urlPathName}`.substring(31),
        countNumber: 0
      })
      console.log(dbs)
    }catch(err){
      throw err;
    }
  }

  if(req.method === "GET" &&  await db.findOne({"url": req.url})){  

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
