const input = document.getElementById("input").value
const button = document.getElementById("button")

let result;

button.onclick = async function(){
    result = await fetch("/send-data", {
        method : "POST",
        headers : {
            'Accept': 'application/json',
            'Content-Type':'application/json; charset=utf-8'
        },
        body : JSON.stringify({
            input
        }),
       
    })
}
console.log(result);