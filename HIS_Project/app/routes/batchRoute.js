const drugStock = require('../models/dispense');
const batch = require('../models/batch');
const drugDetails = require('../models/drugDetails');



module.exports= function (router) {

//get the batch details
    router.get('/batchList', function (req,res) {
        console.log('I received the get request(add batch)');

        batch.find(function (err,response) {
            console.log('send the batch data');
            res.json(response);
        });
    });
//get the drug Details
    router.get('/drugDetailsList', function (req,res) {
        console.log('I received the drug details');

        drugDetails.find(function (err,response) {
            console.log('send the drug data');
            res.json(response);
        });
    });

//get the drugStock details
    router.get('/drugStockList', function (req,res) {
        console.log('I received the stock details');

        drugStock.find(function (err,response) {
            console.log('send the stock data');
            res.json(response);
        });
    });

//save the data in the database
    router.post('/batchList',function (req,res) {
        console.log(req.body);

        const addBatch = new batch(req.body);
        addBatch.save().then(function (newBatch) {
            res.json(newBatch);

        }).catch(function (err) {
            console.error(err);
            res.sendStatus(500);
        });
    });


//get the drug details of particular batch
    router.get('/viewDrugList', function (req,res) {
        console.log('I received the get request(add batch)');

        batch.find(function (err,response) {
            console.log('send the batch data');
            res.json(response);
        });
    });

//search drug names for each category
    router.get('/viewDrugList/:dCat', function (req,res) {
        var drugCat = req.params.dCat;
        console.log(drugCat.data);
        batch.find({drugCategory:drugCat},function (err,response) {
            console.log(response);
            res.json(response);
        });
    });

//search drug Details for each drug Name
    router.get('/viewDrugNameList/:dcategory/:dname',function (req,res) {
        var drugCatgr = req.params.dcategory;
        var drugname = req.params.dname;
        console.log(drugCatgr,drugname);
        batch.find({drugCategory:drugCatgr,drugName:drugname},function (err,response) {
            console.log(response);
            res.json(response);
        });
    });

//view batchList....
    router.get('/viewBatchList/:id',function (req,res) {
        var id=req.params.id;
        console.log(id);
        batch.findById(id).exec().then(function (getBatch) {
            res.json(getBatch);
        }).catch(function (err) {
            console.error(err);
            res.sendStatus(500);
        });
    });

//update batchList....
    router.put('/updateBatchList/:id',function (req,res) {
        var id = req.params.id;
        console.log("update: "+id);
        batch.findByIdAndUpdate(id,req.body,function (response) {
            res.json(response);
        });
    });


    return router;

}
