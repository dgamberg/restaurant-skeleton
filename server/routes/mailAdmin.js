var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/', function(req,res){
    transporter.sendMail({
        from: 'websiteorders@restaurant.com',
        to: 'dgamberg@gmail.com',
        subject: 'New Order #' + req.body.orderID ,
        text: "You have a new order that has been submitted: \n " +
        "Order ID: " + req.body.orderID + "\n" +
        "Date Of Order " + req.body.orderDate +  "\n" +
        "Customer Name: " + req.body.fullName + "\n"
    });
    res.sendStatus(200);
    console.log("Email sent...");
});

module.exports = router;
