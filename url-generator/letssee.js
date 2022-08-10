const http = require("node:http");

const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});


const app = http.createServer((req,res)=>{
    if(req.url === "/mail" && req.method === "GET"){
        proxy.web(req, res, {target:"http://localhost:80"})
    }else{
        proxy.web(req, res, {target:"http://localhost:81"})
    }
})


app.listen(8526, ()=>{
    console.log(8526)
})