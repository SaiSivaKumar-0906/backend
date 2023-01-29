const http = require("node:http");
const post = require("./http-methods/methods").post;

const app = http.createServer((req, res)=>{
    if(req.method === "POST"){
        post(req, res)
    }
})

app.listen(200, ()=>{
    console.log(200)
})
