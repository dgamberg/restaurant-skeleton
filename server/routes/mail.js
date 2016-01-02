var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/', function(req,res){
    var itemToBeMailed = {
        orderFrom: req.body.email,
        orderID: req.body.orderID
    };

    transporter.sendMail({
        from: req.body.email,
        to: 'dgamberg@gmail.com',
        subject: 'New Order - order#' + req.body.orderID ,
        text: 'Order Text will go here'
    });
    res.send("Email Sent to ", req.body.email);
    console.log("Email sent...", itemToBeMailed);
});

module.exports = router;