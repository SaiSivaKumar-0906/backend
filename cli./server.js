const http = require("node:http");
const {Post} = require("./http-methods/methods")


const app = http.createServer((req, res)=>{
    if(req.method === "POST"){
        Post(req, res);
    }
})

app.listen(80, ()=>{
    console.log(80)
})
