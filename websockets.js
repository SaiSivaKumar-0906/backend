const express = require('express')
const { WebSocketServer, WebSocket } = require('ws')
const app = express()

const wss = new WebSocketServer({
  port: 9967,
  clientTracking: true
})

wss.on('connection', function connection(ws) {
    ws.on('message', function(e) {
        const rawMessage = Buffer.from(e).toString()
        try {
            const { sender, message } = JSON.parse(rawMessage)

            for(const client of wss.clients) {
                if(client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        sender, message
                    }))
                }
            }
        } catch(error) {
            // don't crash the server
        }
    })

    ws.on('close', () => {
        
    })

    ws.send(JSON.stringify({
        sender: 'system',
        message: 'connection established'
    }))
})

app.use("/front-end",express.static('front-end'))

const port = 9966
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

