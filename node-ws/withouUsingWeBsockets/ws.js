'use strict';

const os = require("node:os");
const http = require("node:http");
const { WebSocketServer } = require("ws")
const fs = require("node:fs");
const path = require("node:path")
const port = process.argv[2] || 9000;

const wss = new WebSocketServer({noServer: true})


const app = http.createServer(async(req, res)=>{
    console.log(`req ${req.url}`);

    let filePath = `.${req.url}`;
    if (filePath === './') {
      filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.wav': 'audio/wav',
      '.mp4': 'video/mp4',
      '.woff': 'application/font-woff',
      '.ttf': 'application/font-ttf',
      '.eot': 'application/vnd.ms-fontobject',
      '.otf': 'application/font-otf',
      '.wasm': 'application/wasm',
    };

    const contentType = mimeTypes[extname] ?? 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === 'ENOENT') {
          fs.readFile('./404.html', (error, content) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          });
        } else {
          res.writeHead(500);
          res.end(
            `Sorry, check with the site admin for error: ${error.code} ..\n`
          );
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });

    wss.on('connection', function connection(ws) {
        ws.on('message', function message(data) {
          console.log('received: %s', data);
        });
      
        ws.send('something');
      });
})

app.listen(port, ()=>{
    console.log(9966)
})