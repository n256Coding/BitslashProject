/**
 * Created by Nishan on 6/28/2017.
 */
'use strict';

var express = require('express');
var mongoose = require('mongoose');
var Router = express.Router();


var OrderInvoiceModel = require('../models/orderInvoice.model');
var OrderInvoiceItemModel = require('../models/orderInvoiceItem.model');

Router.post('/', function (req, res) {
    var invoice = req.body.invoice;
    var invoiceLineItems = req.body.invoiceLineItems;

    console.log(req.body);

    var OrderInvoiceInstance = new OrderInvoiceModel(invoice);
    var OrderInvoiceItemModelInstance = {};
    OrderInvoiceInstance.save().then(function (orderInvoice) {
        for(var i=0; i<invoiceLineItems.length; i++){
            OrderInvoiceItemModelInstance = new OrderInvoiceItemModel(invoiceLineItems[i]);
            OrderInvoiceItemModelInstance.save().then(function (lineItem) {
                OrderInvoiceModel.findByIdAndUpdate(orderInvoice._id, {$push:{drugsItem:lineItem._id}}).exec();
            });
        }
        OrderInvoiceModel.find().then(function (output) {
            res.json(output);
        })
    });

});

Router.get('/', function (req, res) {
    OrderInvoiceModel.find().populate('drugsItem').then(function (orders) {
        res.json(orders);
    });
});



module.exports = Router;