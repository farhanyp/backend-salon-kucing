import express from 'express'
// import mongoose from "mongoose"
// import { publicApi } from "../routes/public-api.js";
// import { apiRouter } from "../routes/api.js";
// import { errorMiddleware } from '../middleware/error-middleware.js'

export const app = express();
// mongoose.connect('mongodb://localhost:27017/db_salon_hewan', { useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => {
//         console.log('Connected to MongoDB')
//     })
//     .catch((err) => {
//         console.error('Error connecting to MongoDB:', err)
//     });

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*'); // Ganti '*' dengan domain yang sesuai di produksi
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });
  
app.get('/', (req, res) => {
    res.send('Hello World!')
})
// app.use(publicApi)
// app.use(apiRouter)


// app.use(errorMiddleware)


