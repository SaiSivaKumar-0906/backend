const http = require("http");
const fs = require("fs")
const nodemailer = require("nodemailer");

const app = http.createServer(async(req, res)=>{

    if(req.url === "/send-email" && req.method === "POST"){

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    
    const postData = [];  

    for await(const chunk of req){
        postData.push(chunk)
    }

    const {mail} = JSON.parse(Buffer.concat(postData).toString());


    if(!regex.test(mail)){
       return res.end(JSON.stringify("write the correct email address like example@gmail.com"))
    }else{
        res.end(JSON.stringify("check your email"))
    }
}

    if(req.url === "/get-mail" && req.method === "GET"){
        fs.readFile(`${__dirname}/ui/mail.html`, (err, data)=>{
            if(err){
                console.log(err)
            }else{
                res.end(data)
            }
        })
    }
});

app.listen(80, ()=>{
    console.log(`http://192.168.0.129`)
})
