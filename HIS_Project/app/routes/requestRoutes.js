const Drug = require('../models/dispense');
const Request = require('../models/request');
const DrugDetail = require('../models/drugDetails');
var now = new Date();


module.exports= function (router) {

    router.get('/drugList',function(req,res){
       // console.log(' recevied GET prescriptionList request');
        Drug.find(function(err, response){
            res.json(response);
            console.log(response);
        });
    });

    router.get('/getRequestID',function(req,res){
      //  console.log(' recevied GET getRequestID request');
        Request.find(function(err, response){
            res.json(response);
            console.log(response);
        });
    });

    router.post('/addRequest',function(req,res){
       // console.log(' recevied POST newprescriptionList request');
        console.log(req.body);

        const newRequest = new Request(req.body);
        newRequest.save().then(newRequest => {
            res.json(newRequest);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });


    });


    router.get('/category/:name',function(req,res) {
        console.log('/category/:name recevied get prescriptionList request');
        var name = req.params.name;
        console.log(name);

        DrugDetail.find({category: name},
            function (err, response) {
                console.log(response);
                res.json(response);
            });


    });

    router.get('/category/all/drug',function(req,res){
        console.log(' recevied GET category/all/drug request');
        DrugDetail.find(function(err, response){
            res.json(response);
            console.log(response);
        });
    });



    router.get('/sentList',function(req,res){
        console.log('sentList recevied GET prescriptionList request');

        Request.find({status: "pending"},
            function (err, response) {
                console.log(response);
                res.json(response);
            });
    });

    router.get('/drugQuatity/:name/:type',function(req,res){
        var name=req.params.name;
        var type=req.params.type;

        console.log("Name   "+name);
        console.log("Type   "+type);

        console.log('/drugQuatity/:name/:type recevied GET drugQuatity request');

        Drug.find({name:name,type:type},
            function(err, response){
                console.log(response);
                res.json(response);
            });
    });

    return router;
}