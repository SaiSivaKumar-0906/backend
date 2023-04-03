const http = require("node:http");
const fs = require("node:fs");

const httpStatusCodes = {
    "Status-Codes" : [200, 302, 404, 500],
    "mime-type": function(type){
        const mimeType = {
            "Content-Type": type
        }
        return mimeType;
    },
    "Location": "http://localhost:80/camera"
}

function existDir(){
    const dirName = `${__dirname}/public/index.html`
    const existFile = fs.existsSync(dirName);
    if(existFile){
        return dirName
    }
}

function existCamera(){
    const dirName = `${__dirname}/public/camera.html`
    const existFile = fs.existsSync(dirName);
    if(existFile){
        return dirName
    }
}

function indexHtml(res){
    const fileName = existDir();
    fs.readFile(fileName, (err, data)=>{
        if(err){
            throw err;
        }
        res.writeHead(httpStatusCodes["Status-Codes"][0], httpStatusCodes["mime-type"]("text/html"));
        res.write(data);
        res.end();
    })
}

function cameraHtml(res){
    const fileName = existCamera();
    fs.readFile(fileName, (err, data)=>{
        if(err){
            throw err;
        }
        res.writeHead(httpStatusCodes["Status-Codes"][0], httpStatusCodes["mime-type"]("text/html"));
        res.write(data);
        res.end();
    })
}

function redirection(res){
    res.writeHead(httpStatusCodes["Status-Codes"][1], {
        "Location": "http://localhost:80/camera"
    });
    res.end();
}

const port = http.createServer((req, res)=>{
    const reqMethod = {
        Get: Boolean(req.method === "GET"),
        Post: Boolean(req.method === "POST"),
        GetMethod: Boolean(req.url === "/camera")
    }

    if(reqMethod.Get && req.url === "/"){
        indexHtml(res);
    }

    if(reqMethod.Post){
        redirection(res);
    }
    
    if(reqMethod.Get && reqMethod.GetMethod){
        cameraHtml(res);
    }
})

port.listen(80, ()=>{
    console.log("shit is running....")
})
