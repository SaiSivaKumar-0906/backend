const express = require('express')

const put = express()

const port = 6586

const path = require('path')

const multer = require('multer')

const storeage = multer.diskStorage({
    destination : (one, File, back)=>{
        back(null, "serverphotos")
    },
    filename: (reslu, File, cd)=>{
        console.log(File)
        cd(null, Date.now() + path.extname(File.originalname))
    }
})

const upload = multer({storage: storeage})

put.use('/frontend', express.static('frontend'))
put.use(express.json())



put.post('/data', upload.single('images') ,(req, res)=>{
    console.log(req.body)
})

put.listen(port, ()=>{
console.log(`${'http://localhost:'}`+port+'/frontend/form.html')
})
