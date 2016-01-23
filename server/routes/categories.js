var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

mongoose.model('Categories',
    new Schema({
        "_id": String,
        "category_id": Number,
        "category_name": String
    }, {
        collection: 'categories'
    }));
var Categories = mongoose.model('Categories');

console.log("Categories Module Online...");

router.get('/', function(req,res){
    Categories.find({ }, function(err, data){
        if(err){ console.log("ERROR!: ", err); }
        res.send(data);

    });
});

router.post('/', function(req,res){

    var addedCategory = new Categories({
        "_id": null,
        "category_id": null,
        "category_name": req.body.category_name,
    });

    addedCategory.save(function(err, data){
        if(err) console.log(err);
        res.sendStatus(200);
    });
});

module.exports = router;