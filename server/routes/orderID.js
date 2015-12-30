var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//Order ID Schema
var orderID = mongoose.model('orderID', new Schema({
    "_id": String,
    "orderID": Number,
    "requestDate": Date
}, {
    collection: 'orderID'
}));


console.log("orderID Generator Online...");

 //Get the last ID that was entered and return it
router.get('/', function(req,res){
    orderID.findOne({}, {}, { sort: { 'requestDate' : -1 } }, function(err, data) {
        res.send(data);
    });
});

//Post an Update to the ID
router.post('/', function(req,res){
    console.log(req.body.orderID);
    //create new object to send from request body
    var newIDObject = new orderID({
        "_id": null,
        "orderID": req.body.orderID,
        "requestDate": Date.now()
    });
    //send object that was created and save as new record
    newIDObject.save(function(err, data){
        if(err) console.log(err);
    });
});

module.exports = router;