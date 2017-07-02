const request = require('../models/request');

module.exports= function (router) {
//get requestQuantity details
router.get('/requestList', function (req, res) {
    console.log('I received the get request(requestList)');

    request.find({status:"pending"},function (err,response) {
        console.log('send the drug request details')
        res.json(response);
    });
});

//approve request drug quantities
router.put('/requestList/:id',function (req,res) {
    var id = req.params.id;
    request.findByIdAndUpdate(id,req.body, function (response) {
        res.json(response);
    });
});


    return router;
}