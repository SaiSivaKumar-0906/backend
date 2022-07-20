const http = require("http");

const app = http.createServer(async(req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    const postData = [];

    if(req.url === "/api/login" && req.method === "POST"){
    for await(const chunk of req){
        postData.push(chunk)
    } 
    const {username, password} = JSON.parse(Buffer.concat(postData).toString());
    if(!username){
        res.write(JSON.stringify({message:"username must be write"}))
    }else if(!password){
        res.write(JSON.stringify({message:"password must be written"}))
    }
    else{
        res.write(JSON.stringify({message:"account created"}))
    }
    console.log({username, password})
}
res.end();
})

app.listen(5500, ()=>{
    console.log(5500)
})
