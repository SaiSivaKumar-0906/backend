const { WebSocketServer } = require("ws")

const wss = new WebSocketServer({port:9966});

let howManyPeople = "a mfer connected"

wss.on("connection", (ws)=>{
    console.log(howManyPeople);

    ws.on("message", (data)=>{
        let {userSocket} = JSON.parse(data);
        console.log({userSocket})
        ws.send(JSON.stringify({userSocket}))
    })
})

console.log("socket server running")
