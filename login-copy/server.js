const http = require("http");

const app = http.createServer((req, res)=>{
    if(req.url==="/post/data"&& req.method==="POST"){
        let postData = [];
        req.on("data", (data)=>{
            postData.push(data)
        }).on("end", ()=>{
            const data = Buffer.concat(postData).toString();
            console.log(data);
        })
    }
    res.end("hello from back end")
})


app.listen(9966, ()=>{
    console.log("server running at 9966")
})
