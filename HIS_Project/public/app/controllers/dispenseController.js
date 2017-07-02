angular.module('PrescriptionController',[])
    .controller('dispenseController',function ($scope,$http) {


        var  no;
        $scope.IsVisible=false;
        $scope.error=false;
        $scope.info=false;


        console.log('I am dispenseController');



        var refreshDrugList=function () {
            $http.get('/dispense/drugList').then(function (response) {
                console.log("I got data");
                $scope.availableDrugList = response.data;

                console.log(response.data[0].drugId);

            });
        };
        refreshDrugList();

        var refresh=function () {
            $http.get('/dispense/todayPrescriptionList').then(function (response) {
                console.log("I got data");
                $scope.drugList=response.data;

            });
        };

        refresh();


        $scope.searchDrug=function (name) {

            $scope.despence=false;
            $scope.IsVisible = true;
            $scope.prescription = true;
            if (Boolean(name)) {

                console.log(name);
                $http.get('/dispense/search/' + name).then(function (response) {
                    console.log(response.data);
                    $scope.drugList = response.data;

                    $scope.info=false;
                    $scope.error = false;


                });
            }else{
                $scope.info=true;
                $scope.error = true;
                refresh();
            }
        };

        $scope.viewDespence=function (id) {
            console.log(id);
            $scope.prescription = false;
            $scope.despence = true;
            no=id;
            $http.get('/dispense/searchPrescription/' + id).then(function (response) {
                console.log(response.data);
                $scope.drugPrescriptionList = response.data;
                $scope.despencebtn = true;
            });
        };


        $scope.viewPrescription=function (drugPrescriptionList) {
            console.log(no);
            $scope.despence = false;
            $scope.prescription = true;
            var check;


            for(x=0;x<drugPrescriptionList.length;x++) {
                var name = drugPrescriptionList[x].drugDescription;
                var quantity = drugPrescriptionList[x].quantity;
                var despence = drugPrescriptionList[x].despense;
                var type = drugPrescriptionList[x].Type;

                console.log(despence);


                if (String(despence).valueOf() === String("no").valueOf()){
                    check="true";
                    callback(name, quantity,type);

                }else{
                    check="false";
                }

            }

            if(new String(check).valueOf() === new String("false").valueOf()){
                check="true";
                alert("already despence!!!");

            }

        };



        var callback=function (name,quantity,type) {

            $http.get('/dispense/drugQuatity/' + name+'/'+type).then(function (response) {

                console.log("length  "+response.data.length);

                if(response.data.length !==0){

                for (i = 0; i < response.data.length; i++) {

                    var newQuantity = response.data[i].quantity - quantity;
                    var drug_id = response.data[i]._id;
                    var drug_DrugID = response.data[i].drugId;
                    var drug_type = response.data[i].type;
                    var drug_exp = response.data[i].EXP;
                    var drug_remark = response.data[i].remarks;


                    var updated_drug = {
                        drugId: drug_DrugID,
                        name: name,
                        type: drug_type,
                        quantity: newQuantity,
                        EXP: drug_exp,
                        remarks: drug_remark
                    };

                    var d = new Date(drug_exp);

                    var EXP_date = d.getDate();
                    var EXP_month = d.getMonth() + 1;
                    var EXP_year = d.getFullYear();


                    if (checkEXPdate(EXP_year, EXP_month, EXP_date)) {

                        if (newQuantity > 0) {
                            $http.put('/dispense/updateDrug/' + drug_id, updated_drug).then(function (response) {
                                console.log(response);

                            });

                            $http.put('/dispense/prescriptionListUpdate/' + no).then(function (response) {
                                // console.log(response);
                            });

                            break;
                        } else if (i === response.data.length - 1) {
                            alert("Drug not enough !!!");
                        }
                    } else {
                        if (i === response.data.length - 1) {
                            alert("Either all drugs have been expired or drugs not enough to dispense!!!");
                        }

                    }

                }
                refreshDrugList();
            }else
            {
                alert("No Drugs Found!!!");
            }

            });

        };

        var checkEXPdate = function (year,month,date) {

            var now = new Date();
            var currentDate=now.toLocaleDateString("en-US");

            var d = new Date(currentDate);

            var current_year=d.getFullYear();
            var current_month=d.getMonth()+1;
            var current_day=d.getDate();

            var condition1=year-current_year;
            var condition2=month-current_month;
            var condition3=date-current_day;



            //cheack year
            if(condition1 > 0){
                return true;
            }else if(condition1 === 0){

                //check month
                if(condition2 > 0){
                    return true;
                }else if(condition2 === 0){

                    //check date
                    if(condition3 > 0){
                        return true;
                    }else if(condition3 === 0){
                        return false;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            }else{
                return false;
            }

        };


        $scope.Back=function () {
            $scope.despence = false;
            $scope.prescription = true;
        };

    });