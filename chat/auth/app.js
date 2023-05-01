const bcrypt = require("bcrypt");
const saltRounds = 10;

async function storeHasedPassword(username, hashedPassword, res, db){
    const created = await db.create({
        username, 
        hashedPassword
    })
    if(created){
        res.writeHead(201, {
            "Content-Type" : "application/json"
        })
        res.write(JSON.stringify({
            "username" : "created",
            "password" : "created"
        }))
        res.end();
    }else{
        res.writeHead(501, {
            "Content-Type" : "application/json"
        })
        res.write(JSON.stringify({
            "error" : "it is not you it is us!!"
        }))
        return;
    }
}

async function hash(username, password, res, db){
    bcrypt.hash(password, saltRounds, (err, hash)=>{
        if(!err){
            storeHasedPassword(username, hash, res, db);
        }
    })
}


async function usernameAndpassword(req, res, db){
    const array = [];
    for await(const data of req){
        array.push(data);
    }
    const {username, password} = JSON.parse(Buffer.concat(array).toString());
    if(!username){
        res.writeHead(404, {
            "Content-Type" : "application/json"
        })
        res.write(JSON.stringify({
            "username" : "it is not suppose to be blank"
        }))
        return;
    }
    if(!password){
        res.writeHead(404, {
            "Content-Type" : "application/json"
        })
        res.write(JSON.stringify({
            "password" : "it is not suppose to be blank"
        }))
        return;
    }
    hash(username, password, res, db);
}

module.exports.postData = usernameAndpassword;
