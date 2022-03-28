const express = require('express')

const put = express()

const port = 6586

const path = require("path")

const multer = require('multer')

const moongoose = require("mongoose")

moongoose.connect("mongodb://localhost:27017/number-one-images")

const modules = require("./moongoose/database")

const imgstore = multer.diskStorage({
    destination : (live, File, back)=>{
        back(null, "serverphotos")
    },
    filename : (lets, File, cback)=>{
        console.log(File)
        cback(null, Date.now() + path.extname(File.originalname))
    }
})

const imgrec = multer({storage : imgstore})

put.use('/one', express.static('one'))
put.use(express.json())

put.post('/data', imgrec.single('images'), async(req, res)=>{
    const images = req.body;

    const imp = await modules.create({images})
    console.log(imp)
    res.send("uploaded")
})

put.listen(port, ()=>{
console.log(`${'http://localhost:'}`+port+'/one')
})

 
