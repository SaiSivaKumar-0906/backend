const refresh_token = async ()=>{
    const result = await fetch("https://www.googleapis.com/oauth2/v4/token",{
        method: "POST",
        headers: {
            'Content-Type':'application:json'
        }, 
        body : JSON.stringify({
            "client_id":"664042363194-72h9728po8rc5kt5dh20sd582ct692t9.apps.googleusercontent.com",
            "client_secret":"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",
            "refresh_token":"1//04VRGt7e9A4EOCgYIARAAGAQSNwF-L9Ir1mG6-Fd32AAtYTsma33_8n_PCQk24sfzNBKXdf4woUf3RSTc0t47Rnw-UhGql0hlosE",
            "grant_type": "refresh_token"
        })
    })
    const three = await result.json()
    console.log(three)
}
refresh_token();

