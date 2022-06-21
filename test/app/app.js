const button = document.getElementById("submit");
const header = document.getElementById("header");
const input = document.getElementById("text");


button.addEventListener("click", function(){
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = ()=>{
        ws.send(JSON.stringify(input.value));
    }
//     ws.binaryType = "blob";
    ws.onmessage = async (event)=>{
        //receiving binary data;
//       const buffer = event.data;
//       const blob = new Blob([buffer], {type : 'text/plain; charset=uft-8'});
//       const one = await  blob.text();
        
        //receiving json data;
         const name = prompt("enter your name");
         header.innerHTML = `${name} says: ${event.data}`;
    }
})
