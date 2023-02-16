const httpHeaders = {
  statusCodes : [201, 401, 501],
  contentType: function(mimeType){
    const obj = {
      "Content-Type": mimeType
    }
    return obj;
  }
}


async function postReq(req, res){
  const postData = [];
  for await(const data of req){
    postData.push(data);
  }
  const {data} = JSON.parse(Buffer.concat(postData).toString());
  if(data){
    console.log(data);
    res.writeHead(httpHeaders.statusCodes[0], httpHeaders.contentType("application/json"));
    res.write(JSON.stringify("created"));
    res.end();
  }else{
    res.writeHead(httpHeaders.statusCodes[1], httpHeaders.contentType("application/json"));
    res.write(JSON.stringify("you should enter the data"));
    res.end();
  }
}

module.exports.Post = postReq
