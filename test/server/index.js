const webSocket = require("ws");

const ws = new webSocket.Server({
    port : 8080
})

let one = 1;

ws.on("connection", (wss)=>{
    if(one == 1){
        console.log(`${one++}: user connected`);
    }else{
        console.log(`${one++}: users connected`);
    }
    wss.on('message', (data)=>{
        console.log("message recieved from user %s",data);
        wss.send(JSON.parse(data));
    })
})

