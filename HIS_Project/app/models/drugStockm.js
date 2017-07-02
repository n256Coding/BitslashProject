/**
 * Created by madupoorna on 5/4/2017.
 */
var mongoose = require('mongoose');

var drugStockSchema = mongoose.Schema({
    drugId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    EXP: {
        type: String,
        required: true
    },
    remarks: {
        type: String
    }
},{collection:'drugStock'});

var DrugStock = module.exports = mongoose.model('drugStockm', drugStockSchema);

//get drugs
module.exports.getDrugs = function (callback) {
    DrugStock.find(callback);
};

//get drug by id
module.exports.getDrugById = function (id, callback) {
    DrugStock.findById(id, callback);
};

//check is drug already added to stock by invoice no
module.exports.getDrugByInvoiceNo = function (invoice, callback) {
    DrugStock.find({invoiceNo: invoice}, callback);
};

//add drug
module.exports.addDrug = function (drug, callback) {
    console.log(drug);
    DrugStock.create(drug, callback);
};

module.exports.getDrugDetailsByNametypeexp=function(name,type,exp,callback){
    DrugStock.find({name:name,type:type,EXP:exp},callback);
};

//update qty
module.exports.incrementQty=function(id,qty,callback){
    DrugStock.findOneAndUpdate({_id:id},{quantity:qty},callback);
};

//update drug
module.exports.updateDrug = function (id, drug, option, callback) {
    var query = id;
    var update = {
        name: drug.name,
        quantity: drug.quantity,
        type: drug.type,
        provider: drug.provider,
    };
    DrugStock.findOneAndUpdate({drugId:query}, update, option, callback);
};

module.exports.updateSpecificDetail = function (id, drug, option, callback) {
    var query = id;
    var update = {
        name: drug.name,
        type: drug.type,
        provider: drug.provider,
    };
    DrugStock.findOneAndUpdate({drugId:query}, update, option, callback);
};