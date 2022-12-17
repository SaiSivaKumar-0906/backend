const bycrypt = require("bcrypt");
const slatRounds = 10;

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
        bycrypt.hash(password, salt, async(err, hasedPassword)=>{
            if(err){
                throw err;
            }
            try{
               const userData = await db.create({
                  username, 
                  hasedPassword
               })
               if(userData){
                res.writeHead(201, {
                   "Content-Type": "application/json"
                })
                res.write(JSON.stringify("created!!"));
                res.end();
               }
            }
            catch(err){
                if(err.code === 11000){
                    res.writeHead(404, {
                        "Content-Type": "application/json"
                    })
                    res.write(JSON.stringify("username already exist!!"));
                    res.end();
                }
            }
        })
    })
}
module.exports.auth = Post
