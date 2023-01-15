const http = require("node:http");
const post = require("./http-methods/methods").post;


http.createServer((req, res)=>{
    if(req.method === "POST"){
        post(req, res)
    }
}).listen(200, ()=>{
    console.log(200)
})