require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const start = async() => {
    try {
        app.listen(PORT, () => {
            console.log(`Server starter on PORT = ${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
}

start();