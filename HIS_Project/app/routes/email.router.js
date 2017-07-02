/**
 * Created by Nishan on 4/29/2017.
 */
'use strict';

var express = require('express');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var emailSender = require('../Email/EmailSender');



var router = express.Router();




router.post('/', function (req, res) {
    var emailContent = req.body;
    res.json(emailSender(emailContent));
});

module.exports = router;