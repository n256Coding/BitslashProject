const patient = require('../models/patient');


module.exports= function (router) {


//save the patient details
    router.get('/patientList', function (req,res) {
        console.log('I received the get request(Patient)');

        patient.find(function (err,response) {
            console.log('send the patient data');
            res.json(response);
        });
    });

//save the patient data in the database
    router.post('/patientList',function (req,res) {
        console.log(req.body);

        const addPatient = new patient(req.body);
        addPatient.save().then(function (newPatient) {
            res.json(newPatient);

        }).catch(function (err) {
            console.error(err);
            res.sendStatus(500);
        });
    });



    return router;

}

