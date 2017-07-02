/**
 * Created by Nishan on 6/28/2017.
 */
'use strict';

var express = require('express');
var mongoose = require('mongoose');
var Router = express.Router();
var DrugStockModel = require('../models/drugDetails');

Router.get('/', function (req, res) {
    DrugStockModel.find().then(function (output) {
        res.json(output);
    });
});

Router.get('/:id', function (req, res) {
    var drug_id = req.params.id;
    DrugStockModel.find({_id:drug_id}).then(function (output) {
        res.json(output);
    });
});

module.exports = Router;