const input = document.getElementById("input").value
const button = document.getElementById("button")

button.onclick = async function(){
        await fetch("/post/data", {
        method : "POST",
        headers : {
            'Content-Type':'application/json',
        },
        body : JSON.stringify({
            input
        }),
       
    }).then((e)=>console.log(e));
}
