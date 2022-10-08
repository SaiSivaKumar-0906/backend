const http = require("node:http");
const { WebSocketServer } = require("ws");
// const ws = require("ws")
const WebSocket = require("ws");

const app  = http.createServer();

const wss = new WebSocketServer({
   server: app
})


const clients = new Array();

function connections(client){ 

  clients.push(client);

  function endClient(){
    const removedClient = clients.indexOf(client);
    clients.splice(removedClient, 1);
    console.log("connection closed");
  }

  async function responce(data){
    const {message} = JSON.parse(data)
    
    console.log(message)

    brodcast(JSON.stringify(message));   
  }

  client.on('message', responce);
  client.on('close', endClient);
}


function brodcast(data){
  for(let i=0; i<clients.length; i++){
    clients[i].send(data)
  }
}



wss.on("connection", connections)


app.listen(80, ()=>{
    console.log(80)
})
