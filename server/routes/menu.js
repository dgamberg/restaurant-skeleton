var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

mongoose.model('Menu', new Schema({"_id": String, "menu_id": Number, "name": String, "price": String, "category": String, "description": String}, {collection: 'menu'}));
var Menu = mongoose.model('Menu');

console.log("Menu Module Online...");

router.get('/', function(req,res){
    Menu.find({ }, function(err, data){
        if(err){ console.log("ERROR!: ", err); }
        res.send(data);

    });
});
router.get('/findAllByCategory', function(req,res){
    console.log(req.query.category);
    Menu.find({
        "category": req.query.category
    }, function(err, data){
        if(err){ console.log("ERROR!: ", err); }
        console.log(data);
        res.send(data);
    });
});

router.post('/', function(req,res){
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

module.exports = router;