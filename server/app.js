var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var session = require('express-session');
var passport = require('./strategies/user');
var register = require('./routes/register');
var user = require('./routes/user');

var index = require('./routes/index');
var customer = require('./routes/customer');
var menu = require('./routes/menu');

// App Set //
app.set("port", (process.env.PORT || 5000));

// Routes
app.use('/register', register);
app.use('/user', user);
app.use('/customer', customer);
app.use('/menu', menu);
app.use('/', index);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

var mongoDBurl = "mongodb://dg-restaurant-app:dg-restaurant-app@ds061454.mongolab.com:61454/dg-restaurant-app";
var mongoDB = mongoose.connect(mongoDBurl).connection;

// Passport Session Configuration //
app.use(session({
    secret: 'secret',
    key: 'user',
    resave: 'true',
    saveUninitialized: false,
    cookie: {maxage: 600000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

mongoDB.on('open', function(){
    console.log('Database Online... Meow!');
});
mongoDB.on('error', function(err){
    if(err) console.log("MONGO ERROR: ", err);
});

//WildCard
app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "./public", file));
});

// Listen //
app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});