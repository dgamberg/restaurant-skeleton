var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


mongoose.model('Order', new Schema({
    "_id": String,
    "orderID": Number,
    "orderDate": { type: Date, default: Date.now },
    "cartItems": Array,
    "orderTotal": Number,
    "finalTotal": Number,
    "customerID": String,
    "customerInfo:": Object
    }, {
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
        "orderDate": Date.now(),
        "customerID": req.body.customerID,
        "orderID": req.body.orderID,
        "cartItems": req.body.cartItems,
        "orderTotal": req.body.ordersTotal,
        "finalTotal": req.body.finalTotal,
        "customerInfo:": req.body.newCustomer
    });

    addedOrderItem.save(function(err, data){
        if(err) console.log(err);
        res.send(data);
    });
});

module.exports = router;