import express from 'express'
import bodyParser from 'body-parser'

const APP_PORT = process.env.APP_PORT ?? 5003;
const app = express();
app.use(bodyParser.json({ type: 'application/*+json' }))

app.get('/dapr/subscribe', (_req, res) => {
    res.json([
        {
            pubsubname: 'dummyservice',
            topic: "load",
            route: "load"
        }
    ])
})

app.post("/load", (req, res) => {
    console.log("Message received", req.body.data)
    res.sendStatus(200)
})

app.listen(APP_PORT)