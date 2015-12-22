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

// App Set //
app.set("port", (process.env.PORT || 5000));

// Routes
app.use('/register', register);
app.use('/user', user);
app.use('/customer', customer);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));



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

//// MONGO LABS Database Connection //
var mongoDBurl = "mongodb://dg-restaurant-app:dg-restaurant-app@ds061454.mongolab.com:61454/dg-restaurant-app";
var mongoDB = mongoose.connect(mongoDBurl).connection;


 //Mongo Passport Connection //
//var mongoPassportURI = "mongodb://localhost:27017/user_passport_session";
////var mongoPassportDB = mongoose.connect(mongoPassportURI).connection;

mongoDB.on('open', function(){
    console.log('Database Online!');
});
mongoDB.on('error', function(err){
    if(err) console.log("MONGO ERROR: ", err);
});

//Customer Model
mongoose.model('Customer', new Schema({ "customerId": Number, "firstName": String, "lastName": String, "email": String, "street": String, "city": String, "state": String, "zip": String}, {collection: 'customers'}));
var Customer = mongoose.model('Customer');
// Menu Model

app.post('/customer', function(req,res){
    var addedCustomer = new Customer({
        "firstName" : req.body.firstName,
        "lastName" : req.body.lastName,
        "email" : req.body.email,
        "street" : req.body.street,
        "city" : req.body.city,
        "state" : req.body.state,
        "zip" : req.body.zip
    });

    addedCustomer.save(function(err, data){
        if(err) console.log(err);
        res.send(data);
    });
});

app.get('/customer', function(req,res){
    Customer.find({}, function(err, data){
            if(err){
                console.log("ERROR! : ", err);
            }
        res.send(data);
    });
});
// MONGO MENU
mongoose.model('Menu', new Schema({"_id": String, "menu_id": Number, "name": String, "price": String, "category": String, "description": String}, {collection: 'menu'}));
var Menu = mongoose.model('Menu');

app.get('/menu', function(req,res){
    Menu.find({}, function(err, data){
        if(err){ console.log("ERROR!: ", err); }
        res.send(data);

    });
});

app.post('/menu', function(req,res){
    var addedMenuItem = new Menu({
        "_id": null,
        "menu_id": null,
        "name": req.body.name,
        "price": req.body.price,
        "category": req.body.category,
        "description": req.body.description
    });

    addedMenuItem.save(function(err, data){
        if(err) console.log(err);
        res.send(data);
    });
});



app.use('/', index);

//WildCard
app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "./public", file));
});

// Listen //
app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});