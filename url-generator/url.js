const fs = require("node:fs");

const http = require("node:http");

const url = require("node:url");


const myUrl = url.parse(`http://192.168.0.105/video/something`);


const app = http.createServer((req, res)=>{
    if(req.url === myUrl.href && req.method === "GET"){
        fs.readFile(`${__dirname}ui/create.html`, (err, data)=>{
            if(err){
                console.log(err)
            }else{
                res.end(data)
            }
        })
    }
})

app.listen(81, ()=>{
    console.log(81)
})

module.exports.url = myUrl;
