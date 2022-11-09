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
    
    console.log(urlPathName.length);

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
    const tweleCharacters = req.url.substring(31);

    if(await db.findOne({"tweleCharacters": tweleCharacters})){
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
    }else{
      res.writeHead(404, {
        "Content-Type": "text/html"
      })
      res.write("It already using by two members!!");
      res.end();
    }
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

  if(wss.clients.size <= 2){
    ws.on("message", (data)=>{

      const {webSocketMessages} = JSON.parse(data);
  
      if(!webSocketMessages){
        return;
      }
  
      console.log(webSocketMessages)
  
      if(wss.clients.size <= 2){
        wss.brodcast(JSON.stringify({webSocketMessages}));
      }
    })
  }
})



app.listen(8080, ()=>{
  console.log(80)
})



async function udate(){
  const updates = await db.findOne({"url": "/users/27400c8c-33da-42cf-8dc5-e82cf1fce983"});
  await db.findOneAndUpdate(updates);
  return console.log(value)
}

udate();
