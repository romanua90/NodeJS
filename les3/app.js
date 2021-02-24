const fs=require('fs');
const express=require('express')
const path=require('path');

const apiRouter=require('./router/api.router')

const app=express();



const usersPath = path.join(__dirname, 'dataBase', 'users.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/',apiRouter);


app.listen(5000, ()=>{
    console.log('App listen 5000');
})