
appModule.controller('drugRequestController', ['$scope', '$http', 'EmailDataStore', 'OrderInvoiceService',
    function ($scope, $http, EmailDataStore, OrderInvoiceService) {
        $http.get('/drugRequests/approved').then(function (data) {
            $scope.drugRequests = data.data;
            if($scope.drugRequests.length == 0){
                $scope.showSuccessMessage = true;
            }
        });

        if($scope.supplierToSend == undefined){
            $scope.supplierToSend = '';
        }

        $http.get('/drugStocks').then(function (data) {
            $scope.drugs = data.data;
            //TODO $scope.drugs
        });

        $scope.supplierRequestList = [];
        $scope.addToSupplierRequest = function (drugRequest) {
            $scope.supplierRequestList.push(drugRequest);
            var indexOfDrugRequest = $scope.drugRequests.indexOf(drugRequest);
            $scope.drugRequests.splice(indexOfDrugRequest, 1);
        };

        $scope.removeFromSupplierRequest = function (drugRequest) {
            $scope.drugRequests.push(drugRequest);
            var indexOfDrugRequest = $scope.supplierRequestList.indexOf(drugRequest);
            $scope.supplierRequestList.splice(indexOfDrugRequest, 1);
        };

        $scope.setupEmailPage = function (emailData) {
            EmailDataStore.set(emailData);
            console.log('.....................................................................................');
            console.log(emailData);
            var invoice = {};
            invoice.supplier = $scope.supplierToSend.provider;
            invoice.supplierEmail = $scope.supplierToSend.providerEmail;
            EmailDataStore.setEmail($scope.supplierToSend.providerEmail);
            //TODO DONE (invoice.supplierEmail) EmailDataStore.setSupplierEmail(supplierEmail)

            var invoiceLineItems = [];
            for(var i=0; i<$scope.supplierRequestList.length; i++){
                //TODO (Place) orderInvoice < -- > drugRequest
                invoiceLineItems.push({'drug_name':$scope.supplierRequestList[i].drug_name,
                    'qty':$scope.supplierRequestList[i].approved_quantity,
                    'drug_type':$scope.supplierRequestList[i].Type});
            }

            OrderInvoiceService.setOrder(invoice, invoiceLineItems);
        };
    }]);