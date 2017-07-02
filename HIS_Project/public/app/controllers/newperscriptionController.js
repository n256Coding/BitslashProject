angular.module('newPrescriptionCon',[])
    .controller('newperscriptionConntroller',function ($scope,$http) {

        $scope.error=false;
        console.log('newPrescriptionController');

        var refresh=function (id) {
            $http.get('/newPrescription/newPrescriptionList/'+id).then(function (response) {
                console.log("I got data");
                $scope.drugList=response.data;

            });

        };

        $http.get('/newPrescription/drugList').then(function (response) {
            console.log("I got data");
            $scope.availableDrugList = response.data;

            console.log(response.data[0].DrugID);

        });


        $http.get('/newPrescription/patientList').then(function (response) {
            console.log("I got data");
            $scope.patientList = response.data;


        });



        $scope.addDrug=function (patient,prescriptionNo,type,dosage,drugDescription,frequency,period) {


            if(Boolean(patient)&&Boolean(dosage) && Boolean(drugDescription) &&Boolean(type)&& Boolean(frequency)&& Boolean(period)){

                var quantity =dosage*frequency*period;

                var drug={
                    prescriptionNo:prescriptionNo,
                    drugDescription: $scope.drug.drugDescription,
                    Type: $scope.drug.Type,
                    dosage: $scope.drug.dosage,
                    frequency: $scope.drug.frequency,
                    period: $scope.drug.period,
                    quantity: quantity};

                $http.post('/newPrescription/newPrescriptionList',drug).then(function (response) {
                    console.log(response.data);
                    refresh(prescriptionNo);

                });

                console.log("drug.prescriptionNo "+prescriptionNo);
                console.log("patient "+patient);

                $http.get('/newPrescription/CheckPrescription/'+prescriptionNo).then(function (response) {
                    console.log("I got data");
                    console.log(response.data);


                    if(  response.data.length == 0){
                        //if(response.data[0].prescriptionID != percriptionNO){
                        var prescription={
                            patientID:patient,
                            prescriptionID: prescriptionNo,
                        }

                        $http.post('/newPrescription/prescriptionList',prescription).then(function (response) {
                            console.log(response.data);
                        });

                    }

                });
            }else{

                $scope.error=true;
                setTimeout(function ()
                {
                    $scope.$apply(function()
                    {
                        $scope.error = false;
                    });
                }, 2000);
            }

        };


        $scope.removeDrug=function (id,percriptionNO) {
            console.log(id);
            $http.delete('/newPrescription/newPrescriptionList/'+id).then(function (response) {
                refresh(percriptionNO);
            });
        };

        $scope.editDrug=function (id) {
            console.log(id);
            $http.get('/newPrescription/newPrescriptionListEdit/'+id).then(function (response) {
                $scope.drug=response.data;
            });
        };

        $scope.updateDrug=function (percriptionNO,type,dosage,drugDescription,frequency,period) {
            //console.log($scope.drug._id);

            if(Boolean(dosage) && Boolean(drugDescription)&& Boolean(type) && Boolean(frequency)&& Boolean(period)) {

                var quantity =dosage*frequency*period;
                var drug={
                    prescriptionNo:percriptionNO,
                    drugDescription: $scope.drug.drugDescription,
                    Type: $scope.drug.Type,
                    dosage: $scope.drug.dosage,
                    frequency: $scope.drug.frequency,
                    period: $scope.drug.period,
                    quantity: quantity};

                $http.put('/newPrescription/newPrescriptionList/' + $scope.drug._id, drug).then(function (response) {
                    console.log(response);
                    refresh(percriptionNO);

                });
            }else{
                $scope.error=true;
                setTimeout(function ()
                {
                    $scope.$apply(function()
                    {
                        $scope.error = false;
                    });
                }, 2000);
            }
        };


        var getNewPrescription=function () {
            $http.get('/newPrescription/prescriptionList').then(function (response) {

                num=response.data.length;
                console.log(response.data.length);
                if(num == 0){
                    newID=1;
                }else {
                    newID=parseInt(response.data[num-1].prescriptionID) + 1;
                }

                $scope.prescriptionNo=newID;
                refresh(newID);

            });
        }

        getNewPrescription();
        $scope.newPrescription=function () {

            getNewPrescription();

        };


    });