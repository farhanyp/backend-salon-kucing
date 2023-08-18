    import express from 'express'
    import mongoose from "mongoose"
    import path from 'path';
    import { fileURLToPath } from 'url';
    import { publicApi } from "../routes/public-api.js";
    import { adminRouter } from '../routes/admin.js';
    import { apiRouter } from "../routes/api.js";
    import { errorMiddleware } from '../middleware/error-middleware.js'
    import cookieParser from 'cookie-parser';
    import flash from 'connect-flash'
    import cookieSession from 'cookie-session'
    import { indexRouter } from '../routes/index.js';
    import methodOverride from 'method-override'

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename,"..");
    const viewsPath = path.join(path.dirname(__dirname), 'views');
    const publicPath = path.join(path.dirname(__dirname), 'public');
    const SBPath = path.join(__filename, "../../", "../node_modules/startbootstrap-sb-admin-2");

    export const app = express();
    mongoose.connect('mongodb+srv://andrianirahma1:medan122500@cluster0.lf6xcgs.mongodb.net/db_salon_hewan', { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('Connected to MongoDB')
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err)
        });

    app.set('views', viewsPath);
    app.set('view engine', 'ejs');
    app.use(flash());
    app.use(cookieSession({
        name: 'sessionGG',
        keys: ['secret-key'],
        maxAge: 3600000
      }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(publicPath));
    app.use('/sb-admin-2', express.static(SBPath));
    app.use(cookieParser());
    app.use(methodOverride('_method'))  

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    app.use("/api/v1/member",publicApi)
    app.use("/api/v1/admin",apiRouter)
    app.use(indexRouter)
    app.use(adminRouter)


    app.use(errorMiddleware)


