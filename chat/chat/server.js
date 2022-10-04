const http = require("node:http");
const { WebSocketServer } = require("ws");
const ws = require("ws")
const WebSocket = require("ws");

const app  = http.createServer();

const wss = new WebSocketServer({
    server: app
})

wss.on("connection", (ws)=>{
    ws.on("message", (data)=>{
        const {recievedData} = JSON.parse(data.toString());
        ws.send(recievedData);
        console.log(recievedData)
    })
})

app.listen(80, ()=>{
    console.log(80)
})