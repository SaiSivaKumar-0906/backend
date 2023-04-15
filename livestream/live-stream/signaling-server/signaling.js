const ws = require("ws");

function httpServer(HtToWs){
    const wss = new ws.WebSocketServer({
        server: HtToWs
    })
    wss.on("connection", (ws, req)=>{    
        ws.on("message", (data)=>{
            console.log(data) //not good choice to do..
        })
        ws.send("will it change the protocol?");
    })
}



module.exports.httpServer = httpServer;
