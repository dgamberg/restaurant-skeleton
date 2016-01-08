var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var port     = process.env.PORT || 5000;

//var session = require('express-session');
//var passport = require('./strategies/user');
//var register = require('./routes/register');
//var user = require('./routes/user');

var index = require('./routes/index');
var customer = require('./routes/customer');
var menu = require('./routes/menu');
var order = require('./routes/order');
var orderID = require('./routes/orderID');
var customerID = require('./routes/customerID');
var mailAdmin = require('./routes/mailAdmin');
var mailCustomer = require('./routes/mailCustomer');


// Routes

//app.use('/register', register);
//app.use('/user', user);
app.use('/customer', customer);
app.use('/menu', menu);
app.use('/order', order);
app.use('/orderID', orderID);
app.use('/customerID', customerID);
app.use('/mailAdmin', mailAdmin);
app.use('/mailCustomer', mailCustomer);
app.use('/', index);

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var mongoDBurl = "mongodb://myuser:myuser@ds039135.mongolab.com:39135/heroku_6fmvhwxk";
var mongoDB = mongoose.connect(mongoDBurl).connection;


app.use(morgan('dev'));
//app.use(passport.initialize());
//app.use(passport.session());
//
//// Passport Session Configuration //
//app.use(session({
//    secret: 'secret',
//    key: 'user',
//    resave: 'true',
//    saveUninitialized: false,
//    cookie: {maxage: 600000, secure: false}
//}));



mongoDB.on('error', function(err){
    if(err) console.log("MONGO ERROR: ", err);
});

mongoDB.on('open', function(){
    console.log('Mongo Database Online... Meow!');
});

app.listen(port);
console.log('The magic happens on port ' + port);