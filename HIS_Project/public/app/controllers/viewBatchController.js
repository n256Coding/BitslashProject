angular.module('viewBatchController',[])
    .controller('viewBatchController',function ($scope,$http,$window) {

        console.log('hello from Information Controller');

        $scope.showBatch= false;
        //get batch data
        var refreshBatch = function () {
            $http.get('/addBatch/viewDrugList').then(function (response) {
                console.log("I got the data");
                $scope.viewlist1 = response.data;
            });
        };

        refreshBatch();
        $scope.searchDrugCat = function (DrugCat) {
            $http.get('/addBatch/viewDrugList/' + DrugCat).then(function (response) {
                console.log("Get drug name for searched category");
                $scope.viewlist2= response.data;
                refreshBatch();
            });
        };

        $scope.searchDrugDetails = function (category,name) {
            $http.get('/addBatch/viewDrugNameList/' + category+ '/' + name).then(function (response) {
                console.log("get all details of particular name");
                console.log(response.data);
                $scope.viewlist3 = response.data;
                refreshBatch();
            });
        };

        $scope.viewBatch = function (id) {
            $scope.showBatch= true;
            console.log(id);
            $http.get('/addBatch/viewBatchList/' + id).then(function (response) {
                $scope.views = response.data;
                refreshBatch();
            });
        };

        $scope.updateBatch = function () {
            console.log($scope.views._id);
            $http.put('/addBatch/updateBatchList/'+$scope.views._id,$scope.views).then(function (response) {
                console.log(response);
                refreshBatch();
                $scope.views={};
                $scope.showBatch=false;
                $window.confirm("Are you sure you want to update the following data ?");
            });
        }


    });
