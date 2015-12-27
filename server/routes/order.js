var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var CartItems = new Schema({
    "item_name": String
});

mongoose.model('Order', new Schema({
    "_id": String,
    "orderId": Number,
    "orderDate": { type: Date, default: Date.now },
    "cartItems": [ String],
    "cartTotal": Number,
    "customerId": String
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
        "orderId": req.body.orderId,
        "cartItems": req.body.cartItems,
        "cartTotal": req.body.cartTotal,
        "customerId": req.body.customerId
    });
    console.log(req.body);
    addedOrderItem.save(function(err, data){
        if(err) console.log(err);
        res.send(data);
    });
});

module.exports = router;