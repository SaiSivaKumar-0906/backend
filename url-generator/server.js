const http = require("http");
const fs = require("fs")
const nodemailer = require("nodemailer");
const {google} = require("googleapis");

const CLIENT_ID = '106400557797-d8hmi9j0vb5sk3b168n2had7muoblg69.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04Vb3iSaGqSvPCgYIARAAGAQSNwF-L9IrJvwbITuUpy6z4iWYi2xeCUDzCsl5kA3uET8B17R0D0gc_L0xeaBm0TloD5NIASFuQbM';

const random = Math.floor(Math.random()*256)

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
            user: 'webdev0906@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken : REFRESH_TOKEN,
            accessToken : accessToken
        }
    })
    const mailOptions = {
        from : 'webdev0906@gmail.com',
        to : mail,
        text : `http://192.168.0.125/video/${random}\n share with your friends`
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
}  

    fs.readFile(`${__dirname}/ui/mail.html`, (err, data)=>{
        if(err){
            console.log(err)
        }else{
            res.end(data)
        }
    })
}); 

app.listen(80, ()=>{
    console.log(`http://192.168.0.105`)
})
