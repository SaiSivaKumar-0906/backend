const http = require("node:http");
const { WebSocketServer } = require("ws");
// const ws = require("ws")
const WebSocket = require("ws");

const app  = http.createServer();

const wss = new WebSocketServer({
    server: app
})

function sockets(){
  wss.on("connection", (ws)=>{
    ws.on("message", (data)=>{
      const {socket} = JSON.parse(data);
      wss.clients.forEach((client)=>{
        if(client.readyState === WebSocket.OPEN){
          client.send(JSON.stringify(socket))
        }
      })
    })
  })
}

sockets()

app.listen(80, ()=>{
    console.log(80)
})