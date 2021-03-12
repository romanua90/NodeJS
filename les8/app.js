const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '../.env') });

const { MONGO_URL, PORT } = require('./config/config');
const apiRouter = require('./router/api.router');

const app = express();

_connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            customCode: err.customCode || 0,
            message: err.message || 'Unknown Server Error Occurred'
        });
});

app.listen(PORT, () => {
    console.log('Starting NODE SERVER, proceed to localhost:5000');
});

function _connectToDB() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
