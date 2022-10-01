const {WebSocketServer} = require("ws");
const WebSocket = require("ws");
const http = require("node:http");
const mongoose  = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:/socket-server")
const db = require("./db/sockets").messages;

const app = http.createServer();

const wss = new WebSocketServer({
    server: app
})

wss.on("connection", (ws)=>{
    ws.on("message", async(data)=>{

        const {datas} = JSON.parse(data);

        wss.clients.forEach(async(client)=>{
            if(client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify(datas))
            }
        })

        try{
            const dbs = await db.create({
             datas
            })
            console.log(dbs)
        }catch(e){
           ws.send(JSON.stringify("server has blown away for some reason!!"))
        }

    }) 
})


app.listen(80, ()=>{
    console.log(80)
})  