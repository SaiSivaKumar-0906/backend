let submit = document.getElementById("submit")
let header = document.getElementById('result-data')




submit.onclick = async function(){
    
    let username = document.getElementById("username").value

    let password = document.getElementById("password").value

    const result = await fetch("/server/get-data", {
        
        method : "POST",
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify({
            username,
            password
        }),

    }
    ).then((e)=>e.json())
    if(result.status === "account created"){
        header.innerHTML = "you've created account"
    }else{
        header.innerHTML= result.error;
    }
    console.log(result)
}
