import { app } from "./src/application/app.js";
import { publicApi } from "./src/routes/public-api.js";
import { apiRouter } from "./src/routes/api.js";

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(publicApi)
app.use(apiRouter)

app.listen(3000, () => console.log('Sever Running On port 3000'))

