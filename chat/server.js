const http = require("node:http");
const { WebSocketServer } = require("ws");
// const ws = require("ws")
const WebSocket = require("ws");

const app  = http.createServer();

const wss = new WebSocketServer({
   server: app
})

wss.on("connection", function(ws){
  ws.on("message", (data)=>{
    const {message} = JSON.parse(data)
    console.log(message)
    wss.clients.forEach((client)=>{
      if(client.readyState === WebSocket.OPEN){ 
       return client.send(JSON.stringify({
        message
      }))
    }
    })
  })
})



app.listen(80, ()=>{
    console.log(80)
})
