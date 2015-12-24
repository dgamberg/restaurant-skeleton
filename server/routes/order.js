var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.model('Order', new Schema({
    "_id": String,
    "menu_id": Number,
    "name": String,
    "price": String,
    "category": String,
    "description": String}, {
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
        "menu_id": null,
        "name": req.body.name,
        "price": req.body.price,
        "category": req.body.category,
        "description": req.body.description
    });

    addedOrderItem.save(function(err, data){
        if(err) console.log(err);
        res.send(data);
    });
});

module.exports = router;