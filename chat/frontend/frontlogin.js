let submit = document.getElementById("submit")
let header = document.getElementById('result-data')

submit.onclick = async function(){
    
    let username = document.getElementById("username").value

    let password = document.getElementById("password").value

    const result = await fetch("/api/login", {
        method : "POST",
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify({
            username,
            password
        }),
    }).then((e)=>e.json())
    if(result.status === "ok"){
        console.log("got the token : ", result.data)
        localStorage.setItem('token', result.data)
        header.innerText = "successfully loged in"
    }else{
        header.innerText = "password or username might be wrong.."
    }
    console.log(result)
}
