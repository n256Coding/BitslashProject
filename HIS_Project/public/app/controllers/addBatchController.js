angular.module('addBatchController',[])
    .controller('addBatchController',function ($scope,$http,$window) {

        console.log('Hello from Batch controller');

        //get batch data
        var refreshBatch = function () {
            $http.get('/addBatch/batchList').then(function (response) {
                console.log("I got the data");
                $scope.batchlist = response.data;
            });
        };
        refreshBatch();
        //get stock data
        var refreshStock = function () {
            $http.get('/addBatch/drugStockList').then(function (response) {
                $scope.stocklist = response.data;
                $scope.drug={};
            });
        };
        refreshStock();

        //get drug data
        var refreshDrugDetails = function () {
            $http.get('/addBatch/drugDetailsList').then(function (response) {
                $scope.drgdatalist = response.data;
                $scope.drug={};
            });
        }
        refreshDrugDetails();

        //save entered batch data
        $scope.addBatch = function (drugCategory,drugName,batchNumber,Type) {
            if (drugCategory == null || drugName == null || batchNumber == null || Type == null) {
                $window.alert("Fill required fields");
            } else {
                var batchDetails = {
                    drugCategory: drugCategory,
                    drugName: drugName,
                    batchNumber: batchNumber,
                    type: Type
                };
                $http.post('/addBatch/batchList', batchDetails).then(function (response) {
                    console.log(response.data);
                    $window.alert('successfully saved');
                    refreshBatch();
                    refreshStock();
                    refreshDrugDetails();
                });
            };
        };


    });

