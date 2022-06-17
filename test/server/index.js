const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

let one = 1;

io.on('connection', (socket) => {
    if(one === 1){
        console.log(`${one++} user connected`)
    }else{
        console.log(`${one++} users connected`)
    }

    socket.on('message', (message) =>     {
        console.log(message);
        io.emit('message', `${socket.id.substr(0,2)} said ${message}` );   
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080') );