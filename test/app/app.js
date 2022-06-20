const button = document.getElementById("submit");
const header = document.getElementById("header");
const input = document.getElementById("text");


button.addEventListener("click", function(){
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = ()=>{
        ws.send(input.value);
    }
    ws.binaryType = "blob";
    ws.onmessage = async (event)=>{
      const buffer = event.data;
      const blob = new Blob([buffer], {type : 'text/plain; charset=uft-8'});
      const one =  blob.text().then(siva => console.log(siva));
      header.innerHTML = one;
    }
})
