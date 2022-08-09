const http = require("http");
const fs = require("fs")
const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const url = require("./url").url

console.log(url.href)

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;


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
        text : `${url.href}\n share with your friends`
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
    if(req.url !== url.href){
    fs.readFile(`${__dirname}/ui/mail.html`, {encoding:'utf-8', flag:'r'}, (err, data)=>{
        if(err){
            console.log(err)
        }else{
            res.end(data)
        }
    })
}
}); 

app.listen(82, ()=>{
    console.log(`http://192.168.0.105`)
})
