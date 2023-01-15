const headersPost = {
  "two-hundread": 200,
  "four-O-four": 404,
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
        console.log(data);
        postData.push(data);
    }
    const {recivedData} = JSON.parse(Buffer.concat(postData).toString());
    if(recivedData){
        res.writeHead(headersPost["two-hundread"],  headersPost.content("application/json"));
        res.write(JSON.stringify(created));
        res.end();
    }else{
       res.writeHead(headersPost["four-O-four"], headersPost.content("application/json"));
       res.write(JSON.stringify(fourOfour));
       res.end();   
    }
}

module.exports.post = post;