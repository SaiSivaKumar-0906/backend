const http = require('http');
const fs = require("fs")
const nodemailer = require("nodemailer");
const url = require("url");
const {google} = require("googleapis");
const mongoose = require("mongoose");
const db = require("./db/models");
mongoose.connect("mongodb://127.0.0.1/mailId-url")

const CLIENT_ID = '810339894417-i10suc51eicef83cbvu4nr3nna90p41j.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04-G9kIm9tVOUCgYIARAAGAQSNwF-L9IrXZ0L-JhQhdVxHPMw5Jta0PuDpl6pgZyNOhobzyG4z0C6NCEqPNvd9Q2mAt8TCpF6soY';

let pushUrl = [];

const app = http.createServer(async(req, res)=>{

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
}
urls();

function mail(){
    if(req.url === "/" && req.method === "GET"){
    fs.readFile(`${__dirname}/public/index.html`, (err, data)=>{
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
    console.log(`http://localhost:80`)
})
