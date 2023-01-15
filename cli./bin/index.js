#! /usr/bin/env node

async function cli(n){
    try{
        const data = await fetch(n);
        const code = await data.text();
        return console.log(code);
    }catch(err){
        throw err;
    }
}

cli("https://github.com");