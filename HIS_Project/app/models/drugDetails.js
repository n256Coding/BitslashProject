var mongoose = require('mongoose');


const drugDetailsSchema = new mongoose.Schema({
    name:String,
    type: String,
    category: String,
    price: Number,
    dangerLvl: Number,
    reorderLvl: Number,
    provider: String,
    providerEmail:String,
    remarks:String
},{collection:'drugDetails'});


module.exports= mongoose.model('drugDetails', drugDetailsSchema);

