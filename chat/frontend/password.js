let submit = document.getElementById("submit")

submit.onclick = async function(){


    let password = document.getElementById("password").value

    const result = await fetch("/api/change-password", {
        method : "POST",
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify({
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