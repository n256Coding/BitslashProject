var mongoose = require('mongoose');


const DrugPrescriptionSchema = new mongoose.Schema({
    prescriptionNo:String,
    drugDescription: String,
    Type: String,
    dosage: String,
    frequency: String,
    period: String,
    quantity: String,
    despense:{type:String,default:"no"}
},{collection:'prescription'});


module.exports= mongoose.model('drugPrescription', DrugPrescriptionSchema);
