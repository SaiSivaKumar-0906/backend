const express = require('express')

const put = express()

const port = 6586

const path = require("path")

const multer = require('multer')

const moongoose = require("mongoose")

const fs = require('fs')

moongoose.connect("mongodb://localhost:27017/number-one-images")

const images = moongoose.Schema(
    {
       images : {
           data : Buffer,
           contentType : String
       }
    }
)

const modelss = moongoose.model("test", images)


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
     const newItem = new modelss;
     newItem.images.data = fs.readFileSync(req.files.serverphotos.path)
     newItem.images.contentType = 'image/png'
     newItem.save();
     res.send("uploaded")
})

put.listen(port, ()=>{
console.log(`${'http://localhost:'}`+port+'/one/one.html')
})
