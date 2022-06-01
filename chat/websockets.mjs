import { WebSocketServer } from "ws";

const wss  = new WebSocketServer({
    port : 8080
})

wss.on("connection", function connection(ws){
    ws.on("message", function message(data){
        console.log("%s", data);
    });
    ws.send("will it work?")
});

console.log("will it work?")

import express from "express";

const one = express();

one.use("/front-end", express.static("front-end"))
