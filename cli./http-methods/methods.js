const headersPost = {
  statuscodes : [200, 401],
  content: function(n){
    const obj = {
      "Content-Type" : n
    }
    return obj;
  }
}

const created = "got the data!!";
const fourOfour = "you should write the content!!!"

async function post(req, res){
  const postData = [];
  for await(const data of req){
    postData.push(data);
  }
  const {recivedData} = JSON.parse(Buffer.concat(postData).toString());
  if(recivedData){
    res.writeHead(headersPost.statuscodes[0],  headersPost.content("application/json"));
    res.write(JSON.stringify(created));
    res.end();
  } else{
    res.writeHead(headersPost.statuscodes[1], headersPost.content("application/json"));
    res.write(JSON.stringify(fourOfour));
    res.end();   
  }
}

module.exports.post = post;
