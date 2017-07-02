/**
 * Created by madupoorna on 6/29/2017.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderInvoiceItemSchema = new Schema({
    drug_id: {
        type: String,
        required:true
    },
    drug_name: {
        type: String,
        required:true

    },
    type: {
        type: String,
        required:true

    },
    qty: {
        type: Number,
        required:true
    }
}, {collection: 'orderInvoiceItem'});

var OrderInvoiceItemModel = mongoose.model('OrderInvoiceItemModelm', OrderInvoiceItemSchema);

module.exports = OrderInvoiceItemModel;