angular.module('patientController',[])
    .controller('patientController',function ($scope,$http,$window) {


        console.log('Hello from patient Controller');

        //get the patient data
        var refreshID = function () {
            $http.get('/addPatient/patientList').then(function (response) {
                var newId;
                console.log("I got the patient data");
                $scope.patientlist = response.data;
                var num = response.data.length;
                console.log(num);
                if (num == 0) {
                    newId = 1;
                }
                else {
                    newId = parseInt(response.data[num - 1].PatientId) + 1;
                }
                $scope.nextPatientID = newId;
            });
        };

        refreshID();

        //save patient data
        $scope.addPatient = function (nextPatientID,title,fullName,otherName,dateOfBirth,
                                      gender,civilStatus,nic,passport,citizenship,bGroup,language,
                                      address,phone,cPersonName,cPersonTel,remark) {
            var patient = {
                PatientId:nextPatientID,
                title:title,
                fullName:fullName,
                otherName:otherName,
                dateOfBirth:dateOfBirth,
                gender:gender,
                civilStatus:civilStatus,
                nic:nic,
                passport:passport,
                citizenship:citizenship,
                bGroup:bGroup,
                language:language,
                address:address,
                phone:phone,
                cPersonName:cPersonName,
                cPersonTel:cPersonTel,
                remark:remark,
            };

            // console.log($scope.patient);
            $http.post('/addPatient/patientList',patient).then(function (response) {
                console.log(response.data);
                $window.alert('successfully saved');
                refreshID();
            });
        };

    });