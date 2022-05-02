const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app)
const {Server} = require("socket.io");
const io = new Server(server);

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); 

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });


server.listen(9966, ()=>{
    console.log('sever runnig at 9966')
})