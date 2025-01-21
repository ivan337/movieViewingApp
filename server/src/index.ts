import http from 'http';
import path from 'node:path';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import sqliteConnection from './dbService/sqlite-connection';
import abortMiddleware from './middleware/abort-middleware';
import errorMiddleware from './middleware/error-middleware';
import idempotencyMiddleware from './middleware/idempotency-middleware';
import router from './router/index';

import 'dotenv/config';

const app = express();

const PORT = process.env.PORT || 5000;

const initDb = async () => {
    try {
        await sqliteConnection.sync({ force: false });
        console.log('sqlite db is ready');
    } catch (err) {
        console.error('Error synchronizing database:', err);
    }
};

const initMiddleware = () => {
    app.use(express.json());
    app.use(cookieParser());
    app.use(
        cors({
            origin: process.env.CLIENT_URL,
            credentials: true,
        }),
    );

    app.use(abortMiddleware);
    app.use(idempotencyMiddleware);

    app.use('/api', router);
    app.use(errorMiddleware);

    const ROOT_PATH = path.resolve(__dirname, '..');
    app.use(express.static(path.join(ROOT_PATH, 'public')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(ROOT_PATH, 'public', 'index.html'));
    });
};

const gracefulShutdown = (server: http.Server, signal: string) => {
    console.log(`Received ${signal}. Starting graceful shutdown...`);

    server.close(() => {
        console.log('Server closed.');

        sqliteConnection.close().then(() => {
            console.log('Database connection closed');
        });

        process.exit(0);
    });

    setTimeout(() => {
        console.error('Forcing shutdown...');
        process.exit(1);
    }, 10000); // 10 секунд
};

const startServer = async () => {
    try {
        const server = app.listen(PORT, () => {
            console.log(`Server starter on PORT = ${PORT}`);
        });

        server.setTimeout(60 * 1000);

        server.keepAliveTimeout = 30 * 1000;
        server.headersTimeout = 31 * 1000;

        server.on('connection', (socket) => {
            socket.setTimeout(60 * 1000); // 60 секунд
        });

        process.on('SIGINT', () => gracefulShutdown(server, 'SIGINT'));
        process.on('SIGTERM', () => gracefulShutdown(server, 'SIGTERM'));
    } catch (e) {
        console.error(e);
    }
};

const start = async () => {
    await initDb();
    initMiddleware();

    await startServer();
};

start();
