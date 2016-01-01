var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//Order ID Schema
var customerID = mongoose.model('customerID', new Schema({
    "_id": String,
    "customerID": Number,
    "requestDate": Date
}, {
    collection: 'customerID'
}));


console.log("customerID Generator Online...");

//Get the last ID that was entered and return it
router.get('/', function(req,res){
    customerID.findOne({}, {}, { sort: { 'requestDate' : -1 } }, function(err, data) {
        res.send(data);
    });
});

//Post an Update to the ID
router.post('/', function(req,res){

    //create new object to send from request body
    var newIDObject = new customerID({
        "_id": null,
        "customerID": req.body.customerID,
        "requestDate": Date.now()
    });

    //send object that was created and save as new record
    newIDObject.save(function(err, data){
        if(err) console.log(err);
    });
});

module.exports = router;