const { randomFillSync } = require('crypto');
const fs = require('node:fs');
const http = require('http');
const os = require('os');
const path = require('path');
const busboy = require('busboy');

const random = (() => {
  const buf = Buffer.alloc(16);
  return () => randomFillSync(buf).toString('hex');
})();

const app = http.createServer((req, res) => {
  if(req.method === "GET"){
    fs.readFile(`${__dirname}/hate.html`, (err, data)=>{
      if(err){
        throw err;
      }else{
        res.writeHead(200, {
          "Content-Type": "text/html"
        })
        res.write(data);
        res.end();
      }
  })
  }
  if (req.method === 'POST') {
    const bb = busboy({ headers: req.headers });
    bb.on('file', (name, file, info) => {
      const extension = path.extname(info.filename);
      console.log(extension, info);
      const saveTo = path.join(__dirname, `busboy-upload-${random()}.${extension}`);
      file.pipe(fs.createWriteStream(saveTo));
    });
    bb.on('close', () => {
      res.writeHead(200, {
        "Content-Type": 'application/json'
      });
      res.end(JSON.stringify(`That's all folks!`));
    });
    req.pipe(bb);
  }
})

app.listen(8000)

