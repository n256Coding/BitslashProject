var mongoose = require('mongoose');
var now = new Date();


const RequestSchema = new mongoose.Schema({
    RequestID:String,
    drug_name:String,
    requested_quantity:String,
    date:{type:String,default:now.toLocaleDateString("en-US")},
    department:String,
    quantity:String,
    category:String,
    Type:String,
    status:{type:String,default:"pending"},
    approved_quantity:{type:String,default:"1000"},
    approve:{type:String,default:"no"}
},{collection:'request'});

module.exports=mongoose.model('request', RequestSchema);
