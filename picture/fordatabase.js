const express = require("express")

const app = express()

const moongoose = require("mongoose")

const models = require("./moongoose/database")

moongoose.connect("mongodb://localhost:27017/number-one-images")

app.use(express.json())


app.post("/api/send", async(req, res)=>{
    const images = req.body;
    console.log(images)
    const imp = await models.create({images})
    console.log(imp)
    res.json(imp)
})

const port = 0906

app.listen(port, ()=>{
  console.log(`localhost:${port}/api/send`)
})
