var mongoose = require('mongoose');
var now = new Date();

const PrescriptionSchema = new mongoose.Schema({
    patientID:String,
    prescriptionID: String,
    createDate: {type:String,default:now.toLocaleDateString("en-US")},
    prescriptionDate: {type:String,default:now.toLocaleDateString("en-US")}
},{collection:'prescriptions'});


module.exports=mongoose.model('prescription', PrescriptionSchema);
