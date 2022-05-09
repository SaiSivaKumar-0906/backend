import WebSocket from 'ws';
const input = document.getElementById("will-itwork");
const button = document.getElementById("it-will")
const ws = new WebSocket('ws://localhost:9966');

button.onclick = ws.on('open', function open(){
    ws.send('will it work?');
})

ws.on('message', function message(data){
    console.log('see the console will it work?' + data);
})