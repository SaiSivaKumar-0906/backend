let submit = document.getElementById("submit")

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
        console.log(result.data)
        alert('working')
    }else{
        alert(result.error)
    }
    console.log(result)
}