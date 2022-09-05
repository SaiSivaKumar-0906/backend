import { createServer } from "node:http";
import {parse} from "node:url";
import {WebSocketServer} from "ws";

const server = createServer();
const socketServer1 = new WebSocketServer({noServer:true})
const socketServer2 = new WebSocketServer({noServer:true})

socketServer1.on("connection", (ws)=>{
    let userMessage;
    ws.on("message", (data)=>{
        console.log("%s", data)
        userMessage = data;
    })
    ws.send(userMessage);
})

socketServer2.on("connection", (ws)=>{
    let userMessage;
    ws.on("message", (data)=>{
        console.log("%s", data)
        userMessage = data;
    })
    ws.send(userMessage);
})

server.on('upgrade', (req, socket, head)=>{
    const {pathname} = parse(req.url)
    
    if(pathname === "/server1"){
        socketServer1.handleUpgrade(req, socket, head, (ws)=>{
            socketServer1.emit("connection", ws, req)
        })
    }else if(pathname === "/server2"){
        socketServer2.handleUpgrade(req, socket, head, (ws)=>{
            socketServer2.emit("connection", ws, req)
        })
    }else{
        socket.destroy();
    }
})

server.listen(9966, ()=>{
    console.log(9966)
})