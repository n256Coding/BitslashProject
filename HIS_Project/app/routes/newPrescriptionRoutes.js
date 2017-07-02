const Drug = require('../models/dispense');
const DrugPrescription = require('../models/drugInPerscription');
const Prescription = require('../models/prescription');
const Patient = require('../models/patient');
var now = new Date();


module.exports= function (router) {


    router.get('/patientList',function(req,res){
        console.log(' recevied GET patientList request');
        Patient.find(function(err, response){
            res.json(response);
            console.log(response);
        });
    });

    router.get('/newPrescriptionList/:id',function(req,res){
        console.log(' recevied get newprescriptionList request');
        var id=req.params.id;
        console.log(id);

        DrugPrescription.find({prescriptionNo: id},
            function(err, response){
                console.log(response);
                res.json(response);
            });
    });

    router.get('/drugList',function(req,res){
        console.log(' recevied GET prescriptionList request');
        Drug.find(function(err, response){
            res.json(response);
            console.log(response);
        });
    });

    router.post('/newPrescriptionList',function(req,res){
        console.log(' recevied POST newprescriptionList request');
        console.log(req.body);

        const newDrugPrescription = new DrugPrescription(req.body);
        newDrugPrescription.save().then(newdrug => {
            res.json(newdrug);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });


    });

    router.get('/CheckPrescription/:id',function(req,res){
        console.log(' recevied get prescriptionList request');
        var id=req.params.id;
        console.log(id);

        Prescription.find({prescriptionID: id},
            function(err, response){
                console.log(response);
                res.json(response);
            });

    });

    router.post('/prescriptionList',function(req,res){
        console.log(' recevied POSt prescriptionList request');
        console.log(req.body);

        const prescription = new Prescription(req.body);
        prescription.save().then(newdrug => {
            res.json(newdrug);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    });

    router.delete('/newPrescriptionList/:id',function(req,res){
        console.log(' recevied DELETE newprescriptionList request');
        var id=req.params.id;
        console.log(id);

        DrugPrescription.findByIdAndRemove(id, function(err, response){
            if(err)
                res.json({message: "Error in deleting record id " + req.params.id});
            else
                res.json(response);
        });


    });

    router.get('/newPrescriptionListEdit/:id',function(req,res){
        console.log(' recevied get newprescriptionList request');
        var id=req.params.id;
        console.log(id);

        DrugPrescription.findById(id).exec().then(drug => {
            res.json(drug);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    });

    router.put('/newPrescriptionList/:id',function(req,res){
        console.log(' recevied PUT newprescriptionList request');
        var id=req.params.id;
        console.log(id);

        DrugPrescription.findByIdAndUpdate(id, req.body, function(err, response){
            if(err)
                res.json({message: "Error in updating drug with id " + id});
            else
                res.json(response);
        });
    });

    router.get('/prescriptionList',function(req,res){
        console.log(' recevied GET prescriptionList request');

        Prescription.find(function(err, response){
            res.json(response);

        });
    });

    return router;
}