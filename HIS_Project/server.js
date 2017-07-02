var express=require('express');
var app=express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router=express.Router();
var multer = require('multer');
var fs = require('fs');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");


const DrugCategory = require('./app/models/drugCategorym');
const DrugStock = require('./app/models/drugStockm');
const DrugDetails = require('./app/models/drugDetailsm');
const DrugType = require('./app/models/drugTypem');
const OrderInvoice = require('./app/models/orderInvoice.modelm.js');



var appRoutes=require('./app/routes/userRoutes')(router);
var appdispenseRoutes=require('./app/routes/dispenseRoutes')(router);
var apprequestRoutes=require('./app/routes/requestRoutes')(router);
var appNewPrescriptionRoutes=require('./app/routes/newPrescriptionRoutes')(router);

//sajevi
var orderInvoiceRouter = require('./app/routes/order.router');
var requestRouter = require('./app/routes/request');
var drugStockRouter = require('./app/routes/drugStock.router');
var emailRouter = require('./app/routes/email.router');

//sampth
var viewrequestRoutes=require('./app/routes/viewRequestRoute')(router);
var addBatchRoutes=require('./app/routes/batchRoute')(router);
var addPatientRoutes=require('./app/routes/patientRoute')(router);


//madu
var addDrugRoutesm=require('./app/routes/viewDrugRoute')(router);

var path =require('path');

app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.use('/routers',appRoutes);//localhost:3000/routers/users
app.use('/dispense',appdispenseRoutes);
app.use('/request',apprequestRoutes);
app.use('/newPrescription',appNewPrescriptionRoutes);

//sajevi
app.use('/orderInvoices', orderInvoiceRouter);
app.use('/drugRequests', requestRouter);
app.use('/drugStocks', drugStockRouter);
app.use('/emails', emailRouter);

//sampath
app.use('/viewRequest',viewrequestRoutes);
app.use('/addBatch',addBatchRoutes);
app.use('/addPatient',addPatientRoutes);


//madu
app.use('/viewDrug',addDrugRoutesm);

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//////////////////////////////

var newDrugDetailsStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/newdetails');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

var uploadnNewDrugExcel = multer({
    storage: newDrugDetailsStorage,
    fileFilter: function (req, file, callback) {
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');

var uploadReceivedDrugExcel = multer({
    storage: receivedDrugStorage,
    fileFilter: function (req, file, callback) {
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');

var invoiceNo;

var receivedDrugStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/newreceive');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        invoiceNo = file.originalname.split('.');
        invoiceNo = invoiceNo[0];
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

var uploadReceivedDrugExcel = multer({
    storage: receivedDrugStorage,
    fileFilter: function (req, file, callback) {
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');
///////////////////////////////////////


mongoose.connect('mongodb://localhost:27017/HISdb', err => {
    if (err) {
        console.log(err);
        process.exit(1);
    }else{
        console.log("connected to database...");
    }
});
mongoose.Promise = global.Promise;

app.get('*',function (req,res) {
   res.sendfile(path.join(__dirname+'/public/app/views/index.html'));
});

app.listen(3000,function () {
   console.log("running server...");
});





//Madupoorana
//add new drug details from excel file
app.post('/api/drugs/newdetailsuploads', function (req, res) {
    var exceltojson;
    uploadnNewDrugExcel(req, res, function (err) {
        if (err) {
            res.json({error_code: 1, err_desc: err});
            return;
        }
        else {
            if (!req.file) {
                res.json({error_code: 1, err_desc: "No file passed"});
                return;
            }

            if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            try {
                exceltojson({
                        input: req.file.path,
                        output: null,
                        lowerCaseHeaders: true
                    }, function (err, result) {
                        console.log(req.file.path);
                        if (err) {
                            return res.json(err);
                        } else {
                            var msg;
                            result.forEach(function (drugData) {
                                var name = drugData.name;
                                var type = drugData.type;
                                var category = drugData.category;
                                var price = drugData.price;
                                var reorderLvl = drugData.reorderlvl;
                                var dangerLvl = drugData.reorderlvl;
                                var provider = drugData.provider;
                                var providerEmail = drugData.provideremail;
                                var remarks = drugData.remarks;

                                DrugDetails.getDrugByName(name, type, category, price, function (err, drug) {
                                    var notExist;
                                    notExist = !Object.keys(drug).length;

                                    if (notExist) {
                                        var drugJson = {
                                            name: name,
                                            type: type,
                                            category: category,
                                            price: price,
                                            reorderLvl: reorderLvl,
                                            dangerLvl: dangerLvl,
                                            provider: provider,
                                            providerEmail: providerEmail,
                                            remarks: remarks
                                        };
                                        var typ = {drugType: type};
                                        var cat = {category: category};

                                        DrugDetails.addDrug(drugJson, function (err, drug) {
                                            DrugType.addDrugType(typ, function (err, type) {
                                                DrugCategory.addDrugCategory(cat, function (err, categoryCB) {
                                                });
                                            });
                                        })
                                    }
                                    else {
                                        console.log('drug details exists');
                                        message = 'drug details exists';
                                        res.json({message:message});
                                    }
                                });
                            });
                        }
                    }
                );
            }
            catch (e) {
                res.json({error_code: 1, err_desc: "Corupted excel file"});
            }
        }
    })
    ;
});



app.post('/api/drugs/receiveddetailsuploads', function (req, res) {
    var exceltojson;
    uploadReceivedDrugExcel(req, res, function (err) {
        if (err) {
            res.json({error_code: 1, err_desc: err});
            return;
        }
        else {
            if (!req.file) {
                res.json({error_code: 1, err_desc: "No file passed"});
                return;
            }

            if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            try {
                exceltojson({
                    input: req.file.path,
                    output: null,
                    lowerCaseHeaders: true
                }, function (err, result) {
                    console.log(req.file.path);
                    if (err) {
                        return res.json(err);
                    } else {
                        OrderInvoice.getdetailsByInvoiceNo(invoiceNo, function (err, drug) {
                            var notExist = !Object.keys(drug).length;
                            console.log(drug);
                            var state = drug[0].order_state/*["order_state"]*/;

                            if (notExist) {
                                console.log('invoice no. not exist.adding as a new entry');
                                result.forEach(function (drugData) {
                                    var name = drugData.name;
                                    var type = drugData.type;
                                    var qty = drugData.quantity;
                                    var exp = drugData.expdate;
                                    var remarks = drugData.remarks;
                                    DrugDetails.getDrugByNametype(name, type, function (err, data) {
                                        var notExist;
                                        notExist = !Object.keys(data).length;
                                        if (!notExist) {
                                            var id = data[0]["_id"];
                                            var json = {
                                                drugId: id,
                                                name: name,
                                                type: type,
                                                quantity: qty,
                                                EXP: exp,
                                                remarks: remarks
                                            };
                                            DrugStock.getDrugDetailsByNametypeexp(name, type, exp, function (err, res1) {
                                                var notExist;
                                                notExist = !Object.keys(res1).length;
                                                if (notExist) {
                                                    DrugStock.addDrug(json, function (err, res2) {
                                                    });
                                                }
                                                else {
                                                    var stockQty = parseInt(res1[0]["quantity"]);
                                                    var receivedQty = parseInt(qty);
                                                    var totQty = stockQty + receivedQty;
                                                    var id = res1[0]["_id"];
                                                    console.log(id)
                                                    DrugStock.incrementQty(id, totQty, function (err, res3) {
                                                        console.log('incremented');
                                                    })
                                                }
                                            });

                                        } else {
                                            var arr = [];
                                            arr.push(name);
                                            console.log(arr + ' following values are not in drug details.please add them manually to  drug details and stock.');
                                            data.json(arr + ' following values are not in drug details.please add them manually to  drug details and stock.');
                                        }
                                    });
                                });
                            }
                            else {
                                if (new String(state).valueOf() === new String('sent').valueOf()) {

                                    result.forEach(function (drugData) {
                                        var name = drugData.name;
                                        var type = drugData.type;
                                        var qty = drugData.quantity;
                                        var exp = drugData.expdate;
                                        var remarks = drugData.remarks;
                                        OrderInvoice.changeState(invoiceNo, function (err, order) {
                                            console.log('invoice no found.changing state to received');

                                            DrugDetails.getDrugByNametype(name, type, function (err, data) {
                                                var notExist;
                                                notExist = !Object.keys(data).length;
                                                if (!notExist) {
                                                    var id = data[0]["_id"];
                                                    var json = {
                                                        drugId: id,
                                                        name: name,
                                                        type: type,
                                                        quantity: qty,
                                                        EXP: exp,
                                                        remarks: remarks
                                                    };
                                                    DrugStock.getDrugDetailsByNametypeexp(name, type, exp, function (err, res4) {
                                                        var notExist;
                                                        notExist = !Object.keys(res4).length;
                                                        if (notExist) {
                                                            DrugStock.addDrug(json, function (err, res5) {
                                                                console.log("drug added");
                                                            });
                                                        }
                                                        else {
                                                            console.log(res4)
                                                            var stockQty = parseInt(res4[0]["quantity"]);
                                                            var receivedQty = parseInt(qty);
                                                            var totQty = stockQty + receivedQty;
                                                            var id = res4[0]["_id"];
                                                            console.log(id)
                                                            DrugStock.incrementQty(id, totQty, function (err, res6) {
                                                                console.log('incremented');
                                                            })
                                                        }
                                                    });

                                                } else {
                                                    var arr = [];
                                                    arr.push(name);
                                                    console.log(arr + ' following values are not in drug details.please add them manually to  drug details and to stock.')
                                                }

                                            });
                                        });

                                    });
                                }
                                else {
                                    console.log('invoice no already marked as received');

                                }
                            }

                        });

                        res.json({error_code: 0, err_desc: null, data: result});

                    }
                });
            }
            catch (e) {
                res.json({error_code: 1, err_desc: "Corupted excel file"});
            }
        }
    });
});

