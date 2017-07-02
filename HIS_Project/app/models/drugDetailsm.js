/**
 * Created by madupoorna on 5/4/2017.
 */
var mongoose = require('mongoose');

var drugDetailsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dangerLvl: {
        type: Number,
        default:100,
        required: true
    },
    reorderLvl: {
        type: Number,
        required: true
    },
    provider: {
        type: String,
    },
    providerEmail:{
        type:String
    },
    remarks: {
        type: String
    }
},{collection:'drugDetails'});

var DrugDetails = module.exports = mongoose.model('drugDetailsm', drugDetailsSchema);

//get drugs
module.exports.getDrugs = function (callback) {
    DrugDetails.find(callback);
};

//get drug by id
module.exports.getDrugById = function (id, callback) {
    DrugDetails.findById(id, callback);
};

//get drug by name
module.exports.getDrugByName = function (name, type, category, price, callback) {
    DrugDetails.find({name: name, type: type, category: category, price: price}, callback);
};

module.exports.getDrugByNametype = function (name, type, callback) {
    DrugDetails.find({name: name, type: type}, callback);
};

//add drug details
module.exports.addDrug = function (drug, callback) {
    DrugDetails.create(drug, callback);
};

//update drug
module.exports.updateDrug = function (id, drug, option, callback) {
    var query = {_id: id};
    var update = {
        name: drug.name,
        type: drug.type,
        category: drug.category,
        price: drug.price,
        reorderLvl: drug.reorderLvl,
        dangerLvl: drug.dangerLvl,
        provider: drug.provider,
        providerEmail: drug.providerEmail,
        remarks: drug.remarks
    };
    console.log(update);
    DrugDetails.findOneAndUpdate(query, update, option, callback);
};

//delete drug
module.exports.deleteDrug = function (id, callback) {
    var query = {_id: id};
    DrugDetails.remove(query, callback);
};