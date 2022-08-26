const refresh_token = async ()=>{
    const result = await fetch("https://www.googleapis.com/oauth2/v4/token",{
        method: "POST",
        headers: {
            'Content-Type':'application:json'
        }, 
        body : JSON.stringify({
            "client_id":CLIENT_ID,
            "client_secret":CLIENT_SECRET,
            "refresh_token":REFRESH_TOKEN,
            "grant_type": "refresh_token"
        })
    })
    const three = await result.json()
    console.log(three)
}
refresh_token();

