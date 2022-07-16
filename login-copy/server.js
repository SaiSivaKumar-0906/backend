const http = require("http");

const app = http.createServer((req, res)=>{
    if(req.url==="/send-data" && req.method==="POST"){
        let array = []
        req.on("data", (data)=>{
            array.push(data);
        }).on("end", ()=>{
            const data = Buffer.concat(array).toString();
            console.log(data);
        })
    }else{
        res.end("route not found")
    }
});

app.listen(9966, ()=>{
    console.log("server running at 9966")
})