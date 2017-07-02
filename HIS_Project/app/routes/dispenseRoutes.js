
const Drug = require('../models/dispense');
const DrugPrescription = require('../models/drugInPerscription');
const Prescription = require('../models/prescription');
var now = new Date();


module.exports= function (router) {

    router.get('/drugList',function(req,res){
        console.log(' recevied GET prescriptionList request');
        Drug.find(function(err, response){
            res.json(response);
            console.log(response);
        });
    });


    router.get('/todayPrescriptionList',function(req,res){
        console.log(' recevied GET prescriptionList request');

        Prescription.find({createDate: now.toLocaleDateString("en-US")},function(err, response){
            res.json(response);

        });
    });

    router.get('/search/:name',function(req,res) {
        console.log(' recevied get prescriptionList request');
        var name = req.params.name;
        console.log(name);

        Prescription.find({patientID: name},
            function (err, response) {
                console.log(response);
                res.json(response);
            });


    });

    router.get('/searchPrescription/:id',function(req,res){
        console.log(' recevied get prescriptionList request');
        var id=req.params.id;
        console.log(id);

        DrugPrescription.find({prescriptionNo: id},
            function(err, response){

            if(err){
                return res.status(404);
            }else{
                console.log(response);
                res.json(response);
            }

            });

    });

    router.get('/drugQuatity/:name/:type',function(req,res){
        var name=req.params.name;
        var type=req.params.type;

        console.log("Name   "+name);
        console.log("Type   "+type);

        console.log(' recevied GET drugQuatity request');

        Drug.find({name:name,type:type},
            function(err, response){
                console.log(response);
                res.json(response);
            });
    });


    router.put('/updateDrug/:id',function(req,res){
        console.log(' recevied PUT drug prescriptionList request');
        console.log(req.body);
        var id=req.params.id;
        Drug.findByIdAndUpdate(id, req.body, function(err, response){
            if(err)
                res.json({message: "Error in updating person with id " + id});
            else
                res.json(response);
        });


    });


    router.put('/prescriptionListUpdate/:id',function(req,res){
        console.log(' recevied PUTt prescriptionList request');
        var id=req.params.id;
        console.log(id);


        DrugPrescription.updateMany({prescriptionNo: id}, {$set: {despense: 'yes'}
        }, function(err, affected, resp) {
            console.log(affected);
            res.json(resp);
        });

    });


    return router;
}