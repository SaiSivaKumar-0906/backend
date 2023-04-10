const ws = require("ws");

function webSocketServer(httpServer){
    const wss = new ws.WebSocketServer({
        server: httpServer
    })
    wss.on("connection", (ws)=>{
        ws.send("so I could able to established/changed http to websocket connection?")
    })
}

module.exports.webSocketServer = webSocketServer;
