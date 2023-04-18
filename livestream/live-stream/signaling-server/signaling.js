const ws = require("ws");
const fs = require("fs");
const arrayTwo = [];
const {Readable} = require("node:stream");

function httpServer(HtToWs){
    const wss = new ws.WebSocketServer({
        server: HtToWs
    })
    wss.on("connection", (ws)=>{    
        ws.on("message", function(data){
            arrayTwo.push(data);
        });
    })
}

if(arrayTwo.length > 1){
    console.log(arrayTwo);
}

module.exports.hTows = httpServer
