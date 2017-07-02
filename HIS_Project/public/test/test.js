var should = require('chai').should();
var expect=require('chai').expect;
var supertest=require('supertest');
var chaiHttp=require('chai-http');
var chai=require('chai');
var

api=supertest('http://localhost:3000');

chai.use(chaiHttp);

// In this test it's expected a drug list of two drugss
describe('GET /dispense/drugs', function() {
    it('returns a list of drugs', function(done) {
        api.get('/dispense/drugList')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.name).to.not.equal(null);
                expect(res.body.type).to.not.equal(null);
                expect(res.body.quantity).to.not.equal(null);
                expect(res.body.EXP).to.not.equal(null);

                done(err);
            });
    });
});


// Testing the save request expecting status 200 of success
describe('POST /request', function() {
    it('saves a new request', function(done) {
        api.post('/request/addRequest')
            .send({

                    RequestID: "newID",
                    drug_name: "Name",
                    requested_quantity: "reQuantity",
                    department: "department",
                    Type: "Type",

            })
            .expect(200)
            .end(function(err, res) {
                done(err);
            });
    });
});


// Here it'll be tested two behaviors when try to find drugs by name and type
describe('GET /dispense/drugQuatity/:name/:type', function() {
    // Testing how to find drugs by name and type
    it('returns drugs by name and type', function (done) {
        var name='parasitamol';
        var type='tablet';
        api.get('/dispense/drugQuatity/' + name+'/'+type)
            .expect(200)
            .end(function (err, res) {
                expect(res.body.name).to.equal(null);
                expect(res.body.type).to.not.equal(null);
                expect(res.body.quantity).to.not.equal(null);
                expect(res.body.EXP).to.not.equal(null);
                done(err);
            });
    });

});



// Testing how to update a drug expecting status 200 of success
describe('PUT dispense/updateDrug/:id', function() {
    it('updates a drug', function(done) {

        api.put('/dispense/updateDrug/5954bf70deb6d2267c2e3996')
            .send({
                name: 'test'
            })
            .expect(200)
            .end(function(err, res) {
                done(err);
            });
    });
});

// Testing how to delete a request expecting status 200 of success
describe('DELETE /newPrescription/newPrescriptionList/:id', function() {
    it('removes a prescription', function(done) {

        api.delete('/newPrescription/newPrescriptionList/5955168a7e1d8111ccadb206')
            .expect(200)
            .end(function(err, res) {
                done(err);
            });
    });
});




/*
describe('Drugs',function () {

    it('should return a 200 response',function (done) {
        api.get('/dispense/drugList')
            .set('Accept','application/json')
            .expect(200,done);
    });

    it('should be an object with keys and valus',function (done) {
        api.get('/dispense/drugList')
            .set('Accept','application/json')
            .expect(200)
            .end(function (err,res) {

                expect(res.body).to.have.property('message');
                expect(res.body.name).to.not.equal(null);
                expect(res.body).to.have.property('success');
                expect(res.body.type).to.not.equal(null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                expect(res.body).should.have.property('SUCCESS');
                expect(res.body).SUCCESS.should.be.a('object');
                expect(res.body).SUCCESS.should.have.property('name');
                expect(res.body).SUCCESS.should.have.property('lastName');
                expect(res.body).SUCCESS.should.have.property('_id');

                done();

            });
    });


});

*/