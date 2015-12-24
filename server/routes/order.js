var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.model('Order', new Schema({
    "_id": ObjectId,
    "order_timestamp": Timestamp,
    "cart_items": Array,
    "cartTotal": Number,
    "firstName": String,
    "lastName": String,
    "email": String,
    "street": String,
    "city": String,
    "state": String,
    "zip": Number,
    "cc_number": Number,
    "cc_type": String,
    "cc_exp": String }, {
    collection: 'orders'
}));
var Order = mongoose.model('Order');

console.log("Orders Module Online...");

router.get('/', function(req,res){
    Order.find({}, function(err, data){
        if(err){ console.log("ERROR!: ", err); }
        res.send(data);

    });
});

router.post('/', function(req,res){
    var addedOrderItem = new Order({
        "_id": null,
        "order_timestamp": null,
        "cart_items": Array,
        "cartTotal": Number,
        "firstName": String,
        "lastName": String,
        "email": String,
        "street": String,
        "city": String,
        "state": String,
        "zip": Number,
        "cc_number": Number,
        "cc_type": String,
        "cc_exp": String
    });

    addedOrderItem.save(function(err, data){
        if(err) console.log(err);
        res.send(data);
    });
});

module.exports = router;