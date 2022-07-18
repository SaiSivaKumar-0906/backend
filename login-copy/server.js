const express = require('express');

const app =express();

app.use(express.json());

app.post("/post/data", (req, res)=>{
    const {username, password} = req.body;
    if(!username || !password){
        res.status(400).send({mssage:"error", error:"password or username wrong"})
    }else{
        res.status(200).send({message:"successfully created"})
    }
    console.log({username, password})
});

app.listen(9966, ()=>{
    console.log("9966")
})
