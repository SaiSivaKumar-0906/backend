const http = require("node:http");
const { WebSocketServer } = require("ws");
const ws = require("ws")
const WebSocket = require("ws");
const fs = require("node:fs")

const app  = http.createServer((req, res)=>{

  if(req.url === "/" && req.method === "GET"){
    fs.readFile(`${__dirname}/public/index.html` , (err, data)=>{
      try{
        res.end(data)
      }catch{
        throw err
      }
    })
  } 

  if(req.url === "/websocket" && req.method === "GET"){
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

  if(req.url === "/redirects" && req.method === "GET"){
    res.writeHead(302, {
      "Location": "/websocket", 
      "Content-type": "text/html"
    })
    res.end();
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
