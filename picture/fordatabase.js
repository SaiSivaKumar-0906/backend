const express = require("express");

const app = express();

const db = require('mongoose');

const model = require('./moongoose/database')


db.connect('mongodb://localhost:27017/number-one-images')


app.use(express.json())


app.post("/api/creates", async (req, res) => {
  const images = req.body;
  console.log(images)
  const one = await model.create({images})
  console.log(one)
});

app.listen(9658, ()=>{
    console.log("http://localhost:9658/api/creates")
})