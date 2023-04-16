const ws = require("ws");
const fs = require("fs");
const array = [];
const {Readable} = require("node:stream");

function httpServer(HtToWs){
    const wss = new ws.WebSocketServer({
        server: HtToWs
    })
    wss.on("connection", (ws)=>{    
        ws.on("message", async(data)=>{
            for await(const datas of data){
                array.push(datas);
            }
            const readIt = new Readable();
            readIt._read = ()=>{
                array.forEach(chunk =>{
                    readIt.push(chunk);
                })
            }
            readIt.push(null);
            const stream = fs.createWriteStream("experiment.webm");
            readIt.pipe(stream);
        })
    })
}

module.exports.httpServer = httpServer;
