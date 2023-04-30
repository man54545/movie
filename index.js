const express = require('express');
const path = require('path');
const port = 8081;
const passport = require('passport');
const cookie = require('cookie-parser');
const session = require('express-session');
const passportLocal = require('./config/passport-local');
const passportLocalUser = require('./config/passport-local-user');
const db = require('./config/mongoose');
const app = express();

app.use(express.urlencoded());
app.use(cookie());
app.use(session({
    name : "User",
    secret : "Movie",
    saveUninitialized : false,
    resave : true,
    cookie : {
        maxAge : 50*100*100
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index'));
app.use(express.static('assets'));
app.use('/assets/uploads', express.static('assets/uploads'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Server is running on port",port);
});