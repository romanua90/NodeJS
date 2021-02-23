const fs=require('fs');
const express=require('express')
const expressHbs=require('express-handlebars');
const path=require('path');
const app=express();
const usersPath = path.join(__dirname, 'DataBase', 'users.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use (express.static(path.join(__dirname,'static')));

app.set('view engine', '.hbs');
app.engine('.hbs',expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, 'static'));

app.get('/', ((req, res) => {
    res.redirect('/login');
}))



//**
//this block describes REGISTER end point

app.get('/register', ((req, res) => {
    res.render('register');
}))

app.post('/register', (req, res) =>{
    fs.readFile(usersPath,(err, data)=>{
        if(err){
            console.log(err);
            return;
        }
        const {email}=req.body;
        const users= JSON.parse(data.toString());
        const found = users.find(user=>user.email === email);

        if (!found){
            users.push(req.body);

            fs.writeFile(usersPath, JSON.stringify(users), err1=>{
                if(err1){
                    console.log(err1);
                }
            });
             res.redirect('/users');
            return;
        }
          res.redirect('/error')
    });
    });
//**
// this block describes LOGIN end point
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    fs.readFile(usersPath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const {login, password} = req.body;
        const users = JSON.parse(data.toString());
        const found = users.findIndex(user => user.login === login && user.password === password);

        if (found === -1 || login===null) {
            res.redirect('/register');
            return;
        }

        res.redirect(`/users/${found}`);
    });
})


//**
// this block describes USER information end point
app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;

    fs.readFile(usersPath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const users = JSON.parse(data.toString());
        res.render('user', {user: users[userId]});
    });
});
//**
// this block describes INFORMATION ABOUT ALL USERS end point
app.get('/users', (req, res) => {
    fs.readFile(usersPath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const users = JSON.parse(data.toString());
        res.render('users', {users});
    })
});

//**
// this block describes ERROR end point
app.get('/error', (req, res) => {
    res.render('error');
});

app.listen(5000, ()=>{
    console.log('App listen 5000')
})

