

import websocket, {WebSocketServer} from "ws";

import  { shema } from "./models.mjs";

import mongoose from "mongoose";



mongoose.connect("mongodb://127.0.0.1/websocket-chat")

const wss = new WebSocketServer({
   port : 9966
});

wss.on('connection', async function connection(ws){
    ws.on('message', async function message(data){
        console.log(`${data}`)
        const db = await shema.create({
             data
        })
        console.log(db)
    })
 ws.send(`'damn it's working'`)
})

