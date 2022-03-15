const express = require('express')

const put = express()


const port = 6586

put.use('/frontend', express.static('frontend'))
put.use(express.json())

put.get('/user', (request, responce)=>{
   responce.send('photos')
})


put.post('/data', (req, res)=>{
    console.log(req.body)
})

put.listen(port, ()=>{
console.log(`${'http://localhost:'}`+port+'/frontend/form.html')
})
