const http= require('http')
const fs= require("fs")
const static=require('node-static')
const port=6556;

const fine=http.createServer((req, res)=>{
fs.readFile("frontend/input.html",(error, data)=>{
if(error){
res.write('not showing')
}
else{
res.write(data)
}
res.end()
})
})

fine.listen(port,()=>{
console.log(`${'your server running at'}:${'127.0.0.1:'+port}`)
})











































// const server=require('http')
// const fs=require('fs')

// const fine=server.createServer((req, res)=>{
// res.writeHead(200, {'Content-Type':'text/html'})
// fs.readFile('frontend/put.js', function(error, see){
// if(error){
// res.writeHead(404)
// res.write('what the hell is going on')
// }
// else{
// res.write(see)
// }
// res.end()
// })
// })


// fine.listen(5654,()=>{
// console.log("how you doing?")
// })