var mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    PatientId:String,
    title:String,
    fullName:String,
    otherName:{type:String,default:'none'},
    dateOfBirth:String,
    gender:String,
    civilStatus:String,
    nic:String,
    passport:String,
    citizenship:String,
    bGroup:String,
    language:String,
    address:String,
    phone:String,
    cPersonName:String,
    cPersonTel:String,
    remark:String,
},{collection:'patient'});

module.exports=mongoose.model('patient', PatientSchema);