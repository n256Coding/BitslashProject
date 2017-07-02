/**
 * Created by madupoorna on 5/31/2017.
 */

var mongoose = require('mongoose');

var drugTypeSchema = mongoose.Schema({
    drugType: {
        type: String,
        required: true,
        unique: true
    }
},{collection: 'drugTypem'});

var DrugType = module.exports = mongoose.model('drugTypem', drugTypeSchema);

//get drug types
module.exports.getDrugTypes = function (callback) {
    DrugType.find(callback);
};

//check is drug type exist
module.exports.getDrugByType = function (type, callback) {
    DrugType.find({drugType: type},callback);
};

//get drug types by id
module.exports.getDrugTypeById = function (id, callback) {
    DrugType.findById(id, callback);
};

//add drug type
module.exports.addDrugType = function (drugtype, callback) {
    DrugType.create(drugtype, callback);
};

//delete drug type
module.exports.deleteDrugType = function (id, callback) {
    var query = {_id: id};
    DrugType.remove(query, callback);
};