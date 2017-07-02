/**
 * Created by Nishan on 6/28/2017.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderInvoiceItemSchema = new Schema({
    drug_id : {
        type : String
    },
    drug_name : {
        type : String
    },
    drug_type : {
        type : String
    },
    qty : {
        type : Number
    }
}, {collection:'orderInvoiceItem'});

var OrderInvoiceItemModel = mongoose.model('OrderInvoiceItemModel', OrderInvoiceItemSchema);

module.exports = OrderInvoiceItemModel;