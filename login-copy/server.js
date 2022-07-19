const http = require("http");

const app = http.createServer(async(req, res)=>{
    const postData = [];
    if(req.url === "/post/data" && req.method === "POST"){
    for await(const chunk of req){
        postData.push(chunk)
    }
    const {username, password} = JSON.parse(Buffer.concat(postData).toString());
    if(!(username && password)){
        res.write(JSON.stringify({error: "wirte username or password"}))
    }else{
        res.write(JSON.stringify({message : "succesfully created"}))
    }
    console.log({username, password})
    res.end();
}
})

app.listen(9966, ()=>{
    console.log(9966)
})
