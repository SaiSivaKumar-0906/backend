const https = require('https');
const fs = require("fs")
const nodemailer = require("nodemailer");
const url = require("node:url");
const {google} = require("googleapis");
const mongoose = require("mongoose");
const db = require("./db/models");
mongoose.connect("mongodb://127.0.0.1/mailId-url")

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};


const CLIENT_ID = CLIENT_ID;
const CLIENT_SECRET = CLIENT_SECRET;
const REDIRECT_URI = REDIRECT_URI;
const REFRESH_TOKEN = REFRESH_TOKEN;

let pushUrl = [];

const app = https.createServer(options, async(req, res)=>{
    
    let ipAddress;

    if(req.headers['x-forwarded-for']){
        ipAddress = req.headers['x-forwarded-for'].split(",")[0];
    }else if(req.socket && req.socket.remoteAddress){
        ipAddress = req.socket.remoteAddress;
    }else{
        ipAddress = req.ip;
    }

    console.log(`ip address is ${ipAddress}`)

    if(req.url === "/send-email" && req.method === "POST"){

    let videoCount = (Math.random() + 1).toString(36).substring(7);

    const myUrl = url.parse(`http://localhost/video/stream-${videoCount}`)
    
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
        text : `${myUrl.href}, open this link and share this link to your firends if you want to\n${myUrl.pathname}, this url will say to your friends you're streaming or not, to save thier time. Time is precious `
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
            urlPathname,
            ipAddress
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
        
        if(await db.findOne({urlPathname: urlId})){
            res.end(JSON.stringify("user is currently streaming"))
        }else{
            res.end(JSON.stringify("user not streaming right now"))
        }
    }

    if(await db.findOne({urlPathname: req.url}) && req.method === "GET"){
        fs.readFile(`${__dirname}/ui/create.html`, (err, data)=>{
            if(err){
               res.end(JSON.stringify("your ip address is not the same"))
            }else{
                res.end(data)
            }
        })
    }
    // console.log(pushUrl)
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
    console.log(`http://192.168.43.180/create`)
})
