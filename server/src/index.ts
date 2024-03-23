import {Request, Response} from 'express-serve-static-core';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import router from './router/index'
import 'dotenv/config';
import errorMiddleware from "./middleware/error-middleware";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

app.use(errorMiddleware);

const start = async() => {
    try {
        app.get('/', (req:Request, res:Response) => {
            res.send('it\'s okk');

            res.end();
        });
        app.listen(PORT, () => {
            console.log(`Server starter on PORT = ${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
}

start();