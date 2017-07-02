
const DrugCategory = require('../models/drugCategorym');
const DrugStock = require('../models/drugStockm');
const DrugDetails = require('../models/drugDetailsm');
const DrugType = require('../models/drugTypem');
const OrderInvoice = require('../models/orderInvoice.modelm.js');


module.exports= function (router) {



//get all drugs
    router.get('/api/getalldrugs', function (req, res) {
        DrugDetails.getDrugs(function (err, drugs) {
            if (err) {
                throw err;
            }
            res.json(drugs);
        });
    });

    router.get('/api/getdrugstock', function (req, res) {
        DrugStock.getDrugs(function (err, drugs) {
            if (err) {
                throw err;
            }
            res.json(drugs);
        });
    });

//get drug by id
    router.get('/api/getdrug/:_id', function (req, res) {
        DrugDetails.getDrugById(req.params._id, function (err, drug) {
            if (err) {
                throw err;
            }
            res.json(drug);
        });
    });

    router.get('/api/getdrugtypes', function (req, res) {
        DrugType.getDrugTypes(function (err, types) {
            if (err) {
                throw err;
            }
            res.json(types);
        })
    });

    router.get('/api/getdrugcategories', function (req, res) {
        DrugCategory.getDrugCategories(function (err, types) {
            if (err) {
                throw err;
            }
            res.json(types);
        })
    });

//add new drug details
    router.post('/api/addnewdrug/', function (req, res) {
        var name = req.body.name;
        var type = req.body.type;
        var category = req.body.category;
        var price = req.body.price;

        DrugDetails.getDrugByName(name, type, category, price, function (err, drug) {
            var notExist = !Object.keys(drug).length;
            if (notExist) {
                var typ = {drugType: type};
                var cat = {category: category};

                DrugDetails.addDrug(req.body, function (err, res1) {
                    DrugType.addDrugType(typ, function (err, type) {
                        DrugCategory.addDrugCategory(cat, function (err, categoryCB) {
                            message = 'drug added successfully';
                            res.json({message:message});
                        });
                    });
                });
            }
            else {
                console.log('drug details exists');
                message = 'drug details exists';
                res.json({message:message});
            }

        });
    });

    router.post('/api/addtoStock/', function (req, res) {
        var name = req.body.name;
        var type = req.body.type;
        var category = req.body.category;
        var exp = req.body.expDate;
        var price = req.body.price;
        var dangerLvl = req.body.dangerLvl;
        var reorderLvl = req.body.reorderLvl;
        var qty = req.body.qty;
        var provider = req.body.provider;
        var providerEmail = req.body.providerEmail;
        var remarks = req.body.remarks;
        var drugDetailsJson = {
            name: name,
            type: type,
            category: category,
            price: price,
            dangerLvl: dangerLvl,
            reorderLvl: reorderLvl,
            provider: provider,
            providerEmail: providerEmail,
            remarks: remarks
        };

        DrugDetails.getDrugByName(name, type, category, price, function (err, drug1) {
            var notExist = !Object.keys(drug1).length;
            if (notExist) {
                var typ = {drugType: type};
                var cat = {category: category};

                DrugDetails.addDrug(drugDetailsJson, function (err, drug) {
                    DrugType.addDrugType(typ, function (err, cb) {
                        DrugCategory.addDrugCategory(cat, function (err, categoryCB) {
                            DrugStock.getDrugDetailsByNametypeexp(name, type, exp, function (err, res) {
                                var notExist;
                                notExist = !Object.keys(res).length;
                                if (notExist) {
                                    DrugDetails.getDrugByNametype(name, type, function (err, data) {
                                        var id = data[0]["_id"];
                                        var json = {
                                            drugId: id,
                                            name: name,
                                            type: type,
                                            quantity: qty,
                                            EXP: exp,
                                            remarks: remarks
                                        };
                                        DrugStock.addDrug(json, function (err, res) {
                                            console.log("drug added");
                                        })
                                    });
                                }
                                else {
                                    var stockQty = parseInt(res[0]["quantity"]);
                                    var receivedQty = parseInt(qty);
                                    var totQty = stockQty + receivedQty;
                                    var id = res[0]["_id"];
                                    console.log(id)
                                    DrugStock.incrementQty(id, totQty, function (err, res) {
                                        console.log('incremented');
                                    })
                                }
                            })
                        });
                    });
                });

            }
            else {
                console.log('drug details exists');
                DrugStock.getDrugDetailsByNametypeexp(name, type, exp, function (err, res) {
                    var notExist;
                    notExist = !Object.keys(res).length;
                    if (notExist) {
                        DrugDetails.getDrugByNametype(name, type, function (err, data) {
                            var id = data[0]["_id"];
                            var json = {
                                drugId: id,
                                name: name,
                                type: type,
                                quantity: qty,
                                EXP: exp,
                                remarks: remarks
                            };
                            DrugStock.addDrug(json, function (err, res) {
                                console.log("drug added");
                            })
                        });
                    }
                    else {
                        var stockQty = parseInt(res[0]["quantity"]);
                        var receivedQty = parseInt(qty);
                        var totQty = stockQty + receivedQty;
                        var id = res[0]["_id"];
                        console.log(id)
                        DrugStock.incrementQty(id, totQty, function (err, res) {
                            console.log('incremented');
                        })
                    }
                });
            }
            res.json(drug1);
        })
        ;
    });

//add drug to stock
    router.post('/api/adddrug/', function (req, res) {
        var invoiceNo = req.body.InvoiceNo;

        DrugStock.getDrugByInvoiceNo(invoiceNo, function (err, drug) {
            var notExist = !Object.keys(invoiceNo).length;
            if (notExist) {
                DrugStock.addDrug(req.body, function (err, drug) {
                });
            }
            else {
                console.log('drug details exists');
                message = 'drug details exists';
                res.json({message:message});
            }

        });
    });

//update drug by id
    router.put('/api/drugs/:_id', function (req, res) {
        var id = req.params._id;
        var drug = req.body;
        DrugDetails.updateDrug(id, drug, {}, function (err, drug) {
            if (err) {
                throw err;
            }
            res.json(drug);
        });
    });

//delete drug by id
    router.delete('/api/drugs/:_id', function (req, res) {
        var id = req.params._id;
        DrugDetails.deleteDrug(id, function (err, drug) {
            if (err) {
                throw err;
            }
            res.json(drug);
        });
    });

//get all drug types
    router.get('/api/drugtypes', function (req, res) {
        DrugType.getDrugTypes(function (err, drugtypes) {
            if (err) {
                throw err;
            }
            res.json(drugtypes);
        });
    });

    router.post('/api/drugtypes/', function (req, res) {
        var dtype = req.body;
        DrugType.addDrugType(dtype, function (err, type) {
            if (err) {
                throw err;
            }
        });
        res.json(dtype);
    });

    router.put('/api/updateDetails/', function (req, res) {

        var data = req.body;
        var category = req.body.category;
        var dtype = req.body.type;
        var id = req.body.id;
        var typ = {drugType: dtype};
        var cat = {category: category};
        var message = '';

        DrugDetails.updateDrug(id, data, function (req, res1) {
            DrugType.addDrugType(typ, function (err, type) {
                DrugCategory.addDrugCategory(cat, function (err, cate) {
                    DrugStock.updateSpecificDetail(id, data, function (err, res2) {
                        if (err) {
                            message = 'drug not updated';
                            res.json({message: message});
                        }
                        else {
                            message = 'drug updated successfully';
                            res.json({message: message});
                        }
                    })
                })
            });
        });


    });







        return router;

};