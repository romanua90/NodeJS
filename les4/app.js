const express = require('express');

const mongoose = require('mongoose');

const apiRouter = require('./router/api.router');

const app = express();

_dataBaseConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(5000, () => {
    console.log('App listen 5000');
});

function _dataBaseConnect() {
    mongoose.connect('mongodb://localhost:27017/romanua90', { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
