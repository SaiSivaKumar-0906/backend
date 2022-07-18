let submit = document.getElementById("submit")

let result;

submit.onclick = async function(){
    
    let username = document.getElementById("username").value

    let password = document.getElementById("password").value

     result = await fetch("/post/data", {
        method : "POST",
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify({
            username,
            password
        }),
       
    }).then((e)=>console.log(e));
}
