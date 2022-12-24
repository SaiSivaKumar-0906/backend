const bycrypt = require("bcrypt");
const slatRounds = 10;

async function CreatingScehema(res, username, hashedPassword, db){
    try{
        const created = await db.create({
            username,
            hashedPassword
        })
        if(created){
            res.writeHead(201, {
                "Location": "http://localhost/websocketFile",
                "Content-Type": "text/html"
            })
            res.end();
        }
        if(!created){
            res.writeHead(500, {
                "Content-Type": "application/json"
            })
            res.write(JSON.stringify("it is our mistake!!"));
            res.end();
        }
    }catch(err){
        if(err.code === 11000){
            res.writeHead(404, {
                "Content-Type":"application/json"
            })
            res.write(JSON.stringify("username already taken"));
            res.end();
        }
    }
}

async function Post(req, res, db){
    const PostData = [];
    for await(const data of req){
        PostData.push(data);
    }
    const {username, password} = JSON.parse(Buffer.concat(PostData).toString());
    if(!(username && password)){
        res.writeHead(404, {
            "Content-Type": "application/json"
        })
        res.write(JSON.stringify("you must have forgotten username or password!!"));
        res.end();
        return;
    }
    bycrypt.genSalt(slatRounds, (err, salt)=>{
        if(err){
            throw err;
        }
        bycrypt.hash(password, salt, async(err, hashedPassword)=>{
            if(err){
                throw err;
            }
            CreatingScehema(res, username, hashedPassword, db);
        })
    })
}

module.exports.auth = Pos
