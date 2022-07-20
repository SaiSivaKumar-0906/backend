const button = document.getElementById("button");
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;
let result;

const obj = {username, password}

button.onclick = async function(){

    result = await fetch("/app/login",{
        method : "POST",
        headers :{
            "Contenty-type":"application/json"
        },
        body : JSON.stringify(obj)
    }).then((e)=>console.log(e.json()))
};

