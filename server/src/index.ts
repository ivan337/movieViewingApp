import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import router from './router/index'
import 'dotenv/config';
import errorMiddleware from "./middleware/error-middleware";
import sqliteConnection from "./dbService/sqlite-connection";
import path from "node:path";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use('/api', router);

app.use(errorMiddleware);

sqliteConnection.sync({force: true}).then(() => {
    console.log('sqlite db is ready')
});

if (process.env.MODE === 'development') {
    const ROOT_PATH = path.resolve(__dirname, '..');

    app.use(express.static(path.join(ROOT_PATH, 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(ROOT_PATH, 'build', 'index.html'));
    });
}

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server starter on PORT = ${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
}

start();