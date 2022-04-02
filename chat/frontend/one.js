let submit = document.getElementById("submit")

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
        })
    })
    console.log(result)
}