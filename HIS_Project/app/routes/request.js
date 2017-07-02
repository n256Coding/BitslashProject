/**
 * Created by Nishan on 5/20/2017.
 */
'use strict';

var express = require('express');
var mongoose = require('mongoose');
require('../models/request');

var drugRequestModel = mongoose.model('request');
var DrugStockModel = require('../models/drugDetails');

var drugRequestRouter = express.Router();

drugRequestRouter.get('/approved', function (req, res) {
    drugRequestModel.find({status: 'approved'}).then(function (output) {
        res.json(output);
    });
});

drugRequestRouter.get('/approved/:manufact', function (req, res) {
    var manufacturer = route.params.manufact;
    drugRequestModel.find({status:'approved'})
});

drugRequestRouter.put('/ordered', function(req, res){
    var requestDetails = req.body;
    var updatedDocuments = [];
    function doModification(callback){
        for(var i=0; i<requestDetails.length; i++){
        //console.log('_id: '+requestDetails[i]._id);
        //console.log(requestDetails);
        drugRequestModel.findOneAndUpdate({_id:requestDetails[i]._id}, {$set:{status:'requested'}}, {new:true}, function(err, doc){
            console.log(doc);
            updatedDocuments.push(doc);
        });
        }
        callback(updatedDocuments);
    }

    function sendResult(document) {
        res.json(document);
    }

    doModification(sendResult);
});

module.exports = drugRequestRouter;