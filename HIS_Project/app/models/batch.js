var mongoose = require('mongoose');

const BatchSchema = new mongoose.Schema({
    drugCategory:String,
    drugName:String,
    batchNumber:String,
    type:String,
    content:{type:String,default:"1"},
    contentType:{type:String,default:"1"},
    noOfCartoons:{type:String,default:"1"},
    noOfCards:{type:String,default:"10"},
    noOfTablets:{type:String,default:"2"},
    quantity:{type:String,default:"1"},
    manufactureDate:{type:String,default:"1"},
    expireDate:{type:String,default:"1"},
    batchStatus:{type:String,default:"Usually used"}

},{collection:"batchdata"});

module.exports= mongoose.model('batchdata', BatchSchema);
