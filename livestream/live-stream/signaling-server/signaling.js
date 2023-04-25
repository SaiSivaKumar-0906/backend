const ws = require("ws");
const fs = require("fs");
const { Readable } = require('stream');
const arrayBufferData = [];

function createWebM(bufferData){
    arrayBufferData.push(bufferData)
    const webmReadable = new Readable();
    webmReadable._read = () => {  };
    arrayBufferData.forEach(chunk => {
        webmReadable.push(chunk);
    });
    webmReadable.push(null);
    
    const outputWebmStream = fs.createWriteStream('funnE.webm');
    webmReadable.pipe(outputWebmStream)
}

function httpServer(HtToWs){
    const wss = new ws.WebSocketServer({
        server: HtToWs
    })
    wss.on("connection", (ws)=>{    
        ws.on("message", (data)=>{
            createWebM(data)
        });
    })
}


module.exports.hTows = httpServer
