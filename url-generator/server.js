const http = require("http");
const fs = require("fs")
const nodemailer = require("nodemailer");
const url = require("node:url");
const {google} = require("googleapis");
const mongoose = require("mongoose");
const db = require("./db/models")
mongoose.connect("mongodb://127.0.0.1/mailId-url")


const CLIENT_ID = CLIENT_ID;
const CLIENT_SECRET = CLIENT_SECRET;
const REDIRECT_URI = REDIRECT_URI;
const REFRESH_TOKEN = REFRESH_TOKEN;

let pushUrl = [];

const app = http.createServer(async(req, res)=>{

    if(req.url === "/send-email" && req.method === "POST"){

    let videoCount = (Math.random() + 1).toString(36).substring(7);

    const myUrl = url.parse(`http://192.168.0.111/video/stream-${videoCount}`)
    
    let urlPathname = myUrl.pathname
    
    pushUrl.push(myUrl.pathname);

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    
    const postData = [];  

    for await(const chunk of req){
        postData.push(chunk)
    }

    const {mail} = JSON.parse(Buffer.concat(postData).toString());


    if(!regex.test(mail)){
       return res.end(JSON.stringify("write the correct email address like example@gmail.com"))
    }   

    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

    oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

async function sendMail(){
  try{
    const accessToken = await oAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
        service: 'gmail',

        auth: {
            type: 'OAuth2',
            user: 'saisivakumar0906@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken : REFRESH_TOKEN,
            accessToken : accessToken
        }
    })
    const mailOptions = {
        from : 'saisivakumar0906@gmail.com',
        to : mail,
        text : `${myUrl.href}, this link is four you\n${myUrl.pathname}, this is for your friends say them to paste this link in something input box`
    }
    const result = await transport.sendMail(mailOptions);
    return result;
  }
  catch(err){
    if(err){
       console.log(err)
    }
  }
}


sendMail().then(res => console.log(`mail sent to:${mail}`)).catch(err => console.log(err.message))

res.end(JSON.stringify("check mail"))   

async function dbs(){
    try{
        const dbase = await db.create({
            mail,
            urlPathname
        })
        console.log(dbase)
    }catch(err){
        console.log(err)
    }
}
dbs()
}  

async function urls(){
    if(req.url === "/send-url" && req.method === "POST"){

        const urlData = [];
    
        for await(const urldatas of req){
            urlData.push(urldatas);
        }
    
        const {urlId} = JSON.parse(Buffer.concat(urlData).toString())
    
        if(!urlId){
           return res.end(JSON.stringify("write the data, then press the submit button"))
        }else{
            console.log({urlId})
        }
        
        if(await db.findOne({urlPathname : urlId}).exec()){
            res.end(JSON.stringify("user present"))
        }else{
            res.end(JSON.stringify("there is no such link available. Or you might miswrote the link, do check it once"))
        }
        
    }

    for(let i=0; i<pushUrl.length; i++){
    if(req.url === pushUrl[i] && req.method === "GET"){
        fs.readFile(`${__dirname}/ui/create.html`, (err, data)=>{
            if(err){
                console.log(err)
            }else{
                res.end(data)
            }
        })
    }
    // console.log(pushUrl)
}
}
urls();

function mail(){
    if(req.url === "/create" && req.method === "GET"){
    fs.readFile(`${__dirname}/ui/mail.html`, (err, data)=>{
        if(err){
            console.log(err)
        }else{
            res.end(data)
        }
    })
}
}
mail();
}); 

app.listen(80, ()=>{
    console.log(`http://192.168.0.111:80/create`)
})
