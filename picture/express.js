const express = require('express')

const one=express()

const path=require('path')

one.use('/frontend',express.static(path.resolve(__dirname,'frontend')))

one.get('/',(req, res)=>{
res.send('how you doing?')
})

one.listen(9658,()=>{
console.log("running at:127.0.0.1:9658")
})