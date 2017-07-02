angular.module('managmentCon',[])
    .controller('managmentConntroller',function ($scope,$http,$window) {

        console.log('Hello from Request controller');

        //get drug requests list from server
        var refreshRequests = function () {
            $http.get('/viewRequest/requestList').then(function (response) {
                console.log('got the request list');
                $scope.requestlist = response.data;
            });
        };
        refreshRequests();

        //-----------------------update request data--------------------------------------
        $scope.approveRequest = function (id,approveQty,availableQty) {
            if (approveQty < availableQty) {
                var approve = {
                    approved_quantity: approveQty,
                    status: "Approved",
                    approve: "yes",
                };
                $http.put('/viewRequest/requestList/' + id, approve).then(function (response) {
                    console.log(response);
                    $window.alert("Successfully Updated");
                    refreshRequests();
                });
            } else {
                $window.alert("Not Available");
                refreshRequests();
            };
        };


    });