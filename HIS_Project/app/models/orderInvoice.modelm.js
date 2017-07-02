/**
 * Created by madupoorna on 6/29/2017.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderInvoiceSchema = new Schema({
    invoice_number: {
        type: String
    },
    supplier: {
        type: String
    },
    order_date: {
        type: Date,
        default: Date.now()
    },
    drugsItem: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderInvoiceItemModel'
    }],
    order_state: {
        type: String,
        default: 'sent'
    }
}, {collection: 'orderInvoice'});

var OrderInvoiceModel = module.exports = mongoose.model('OrderInvoiceModelm', OrderInvoiceSchema);

module.exports.getdetailsByInvoiceNo = function (no, callback) {
    OrderInvoiceModel.find({_id: no}, callback);
};

module.exports.changeState=function(no,callback){
    OrderInvoiceModel.findOneAndUpdate({_id:no},{order_state:'received'},callback);
}
