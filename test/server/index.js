const webSocket = require("ws");

const ws = new webSocket.Server({
    port : 8080
})

ws.on("connection", (wss)=>{
    wss.on('message', (data)=>{
        console.log("message recieved from user %s",data);
        wss.send(data);
    })
})

