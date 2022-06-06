
const url = ("ws://localhost:8080");
const ws= new WebSocket(url);
const button = document.getElementById("button")
const input = document.getElementById("input")


button.addEventListener("click", one())


function one(){
    ws.onopen = ()=>{
        ws.send(JSON.stringify(input.value));
    }
}



