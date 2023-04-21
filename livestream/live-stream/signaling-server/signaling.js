const ws = require("ws");
const fs = require("fs");
const webM = require("../s").sussy

function httpServer(HtToWs){
    const wss = new ws.WebSocketServer({
        server: HtToWs
    })
    wss.on("connection", (ws)=>{    
        ws.on("message", (data)=>{
            webM(data)
        });
    })
}




module.exports.hTows = httpServer
