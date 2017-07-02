/**
 * Created by Nishan on 6/28/2017.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderInvoiceSchema = new Schema({
    invoice_number : {
        type : String
    },
    supplier : {
        type : String
    },
    order_date : {
        type : Date,
        default : Date.now()
    },
    drugsItem : [{
        type : Schema.Types.ObjectId,
        ref : 'OrderInvoiceItemModel'
    }],
    order_state : {
        type : String,
        default : 'sent'
    }
}, {collection:'orderInvoice'});

var OrderInvoiceModel = mongoose.model('OrderInvoiceModel', OrderInvoiceSchema);

module.exports = OrderInvoiceModel;