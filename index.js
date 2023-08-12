// import { app } from "./src/application/app.js";
import express from 'express'

const app = express()
const publicApi = new express.Router()

app.use(express.json());

app.use(publicApi)

publicApi.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(3000, () => console.log('Sever Running On port 3000'))

