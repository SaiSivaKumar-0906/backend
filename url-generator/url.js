const url = require("node:url");

let videoCount = (Math.random() + 1).toString(36).substring(7);

console.log(videoCount)

const myUrl = url.parse(`http://192.168.0.105/video/stream-${videoCount}`);

module.exports.url = myUrl;
