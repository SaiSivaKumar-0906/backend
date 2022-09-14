const ws = new WebSocket("ws://localhost:9966");
ws.onopen = function (event) {
    ws.send("Hello");
}

ws.onmessage = function (event) {
    document.getElementById("last-msg").innerText = event.data;
}