const express = require('express');

const mongoose = require('mongoose');
const { MONGO_URL, PORT } = require('./config/config');

const apiRouter = require('./router/api.router');

const app = express();

_dataBaseConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log('App listen 5000');
});

function _dataBaseConnect() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
