var mongoose = require('mongoose');
/*
const DrugSchema = new mongoose.Schema({
    DrugID: String,
    DrugName: String,
    Quantity: String
},{collection:'drugs'});
*/
const DrugSchema = new mongoose.Schema({
    drugId: Number,
    name: String,
    type:String,
    quantity: Number,
    EXP:String,
    remarks:String
},{collection:'drugStock'});


module.exports=mongoose.model('drugStock', DrugSchema);