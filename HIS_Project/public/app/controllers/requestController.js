angular.module('ReqController',[])
    .controller('requestController',function ($scope,$http) {

        console.log('requestController');
        $scope.successfull=false;
        $scope.error=false;
        $scope.beforeCategory=false;
        $scope.aftercategoryTable=false;

        $scope.clickedCategory=function (categoty) {

            if(Boolean(categoty)){

                $http.get('/request/category/'+categoty).then(function (response) {
                    console.log("I got data");
                    $scope.categoryDrugList=response.data;

                    $scope.beforeCategory=true;

                });
            }
        };




        $http.get('/request/category/all/drug').then(function (response) {
            console.log("/request/category/all/drug I got data");
            $scope.categoryList=response.data;
            console.log(response.data);


        });

        $http.get('/request/drugList').then(function (response) {
            console.log("I got data");
            $scope.availableDrugList=response.data;

            console.log(response.data[0].drug_name);

        });

        var refreashtable=function () {
            $http.get('/request/sentList').then(function (response) {
                console.log("I got data");
                $scope.sentList=response.data;

                console.log(response.data[0].drug_name);

            });
        };



        $scope.sendRequest=function (category,reQuantity,department,Name,Type) {

            var num,newID;
            if(Boolean(category)&&Boolean(reQuantity) && Boolean(department)&& Boolean(Name)&& Boolean(Type)){
                $http.get('/request/getRequestID').then(function (response) {


                    num=response.data.length;
                    console.log(response.data.length);
                    if(num == 0){
                        newID=1;
                    }else {
                        newID=parseInt(response.data[num-1].RequestID) + 1;
                    }

                    callback(category,newID,reQuantity,department,Name,Type);

                    $scope.aftercategoryTable=true;
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



        var callback= function (category,newID,reQuantity,department,Name,Type) {

            var count;
            $http.get('/dispense/drugQuatity/' + Name+'/'+Type).then(function (response) {

                console.log("length  " + response.data.length);

                var len =response.data.length-1;
                count = response.data[len].quantity;

                var request = {
                    RequestID: newID,
                    drug_name: Name,
                    requested_quantity: reQuantity,
                    department: department,
                    quantity: count,
                    category: category,
                    Type: Type,
                };



                $http.post('/request/addRequest',request).then(function (response) {

                    refreashtable();
                    if(Boolean(response)){

                        $scope.successfull=true;

                        setTimeout(function ()
                        {
                            $scope.$apply(function()
                            {
                                $scope.successfull = false;
                            });
                        }, 2000);

                    }
                });


            });






        }





    });
