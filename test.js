
const WebSocket = require("ws");

const webSocket = new WebSocket.Server({
  port : 8080
});

webSocket.on('connection', function (socket){
  console.log("will he connect");

   socket.on('message', function message(msg){
     console.log("message recieved from %s", JSON.stringify(msg));

   });
   socket.send("hello, user")
});
