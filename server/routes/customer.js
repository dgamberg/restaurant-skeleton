var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


mongoose.model('Customer',
    new Schema({
        "customerID": Number,
        "firstName": String,
        "lastName": String,
        "email": String,
        "street": String,
        "city": String,
        "state": String,
        "zip": String
    }, {
        collection: 'customers'
    }));
var Customer = mongoose.model('Customer');

console.log("Customer Module Online...");
router.post('/', function(req,res){
    var addedCustomer = new Customer({
        "customerID" : req.body.customerID,
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

router.get('/', function(req,res){
    Customer.find({}, function(err, data){
        if(err){
            console.log("ERROR! : ", err);
        }
        res.send(data);
    });
});

//
module.exports = router;