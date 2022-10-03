const http = require("node:http");
const { WebSocketServer } = require("ws");
const WebSocket = require("ws");

const app = http.createServer();

const wss = new WebSocketServer({
    server: app
})


wss.on("connection", (ws)=>{
    console.log("a user is connected")

    ws.on("message", (data)=>{

        const {message} = JSON.parse(data.toString())

        wss.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify(message))
            }
        })

       console.log(message)
    })
})



app.listen(80, ()=>{
    console.log(80)
})
