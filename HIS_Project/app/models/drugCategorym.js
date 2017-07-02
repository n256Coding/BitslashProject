/**
 * Created by madupoorna on 5/4/2017.
 */
var mongoose = require('mongoose');

var drugCategorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true
    }
},{collection:'drugCategorym'});

var DrugCategory = module.exports = mongoose.model('drugCategorym', drugCategorySchema);

//get drug categories
module.exports.getDrugCategories = function (callback, limit) {
    DrugCategory.find(callback).limit(limit);
};

//check is drug category exist
module.exports.getDrugBycategory = function (category, callback) {
    DrugCategory.find({category: category}, callback);
};

//add drug category
module.exports.addDrugCategory = function (drugCat, callback) {
    DrugCategory.create(drugCat, callback)
};