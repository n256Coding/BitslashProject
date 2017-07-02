/**
 * Created by Nishan on 5/1/2017.
 */
'use strict';

appModule.controller('emailController', ['$scope', '$http', 'EmailDataStore', 'OrderInvoiceService', '$location',
    function ($scope, $http, EmailDataStore, OrderInvoiceService, $location) {
        function validateEmailAddress(email){
            email = email.toString();
            if(email.indexOf('@') > 0 && email.indexOf('.') > -1 && email.lastIndexOf('.') > email.indexOf('@'))
            {
                return false;
            }
            else
                return true;

        }


        $scope.emailContent = {};
        //$scope.emailData = [];
        $scope.emailData = EmailDataStore.get();
        console.log($scope.emailData);

        if($scope.emailData.length < 1){
            var earl = '/makeOrder/';
            $location.path(earl);
        }

        if($scope.emailContent.extraContent == undefined){
            $scope.emailContent.extraContent = '';
        }

        $scope.emailContent.to = EmailDataStore.getEmail();
        $scope.emailContent.subject = 'Drug Order Request';
        $scope.emailContent.text = 'Dear Officer,\n'+
                                    'The Quantities of the below Drugs are Low.\n'+
                                    'Name\t\t\t Qty\n';
        for(var i=0; i<$scope.emailData.length; i++){
            $scope.emailContent.text = $scope.emailContent.text.toString().concat($scope.emailData[i].drug_name.toString(),'\t\t', $scope.emailData[i].approved_quantity, '\n');
        }

        $scope.emailContent.text = $scope.emailContent.text +'Please be kind enough to send us new stocks'+'\n\n'+
                                                                'Best Regards,'+'\n'+
                                                                'Chief Pharmasist';
        $scope.emailContent.date = new Date().toDateString();
        console.log($scope.emailContent.htmlContent);

        function setContent() {
            $scope.emailContent.htmlContent = "<div class='well'>" +
                "<p>Dear Officer, </br>The Quantities of the below Drugs are Low.</p>" +
                "<table class='table'>" +
                "<thead>" +
                "<tr>" +
                "<th style='width: 100px;'>Name</th>" +
                "<th style='width: 100px;'>Type</th>" +
                "<th style='width: 30px;'>Qty</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody>";
            for(var i=0; i<$scope.emailData.length; i++){
                //for(var data in $scope.emailData){
                $scope.emailContent.htmlContent += "<tr><td>" + $scope.emailData[i].drug_name+"</td>"+
                    "<td>" + $scope.emailData[i].Type + "</td>" +
                    "<td>" + $scope.emailData[i].approved_quantity + "</td></tr>";
            }
            $scope.emailContent.htmlContent += '</tbody>'+
                "</table>" +
                "<p>" + $scope.emailContent.extraContent + "</p>" +
                "<p>Please be kind enough to send us new stocks</br>" +
                "</br>" +
                "Best Regards,<br>" +
                "Chief Pharmasist</p>" +
                "</div>";
        }


        $scope.sendEmail = function () {
            setContent();
            if($scope.emailContent.to.toString().trim() == "") {
                alert('Please enter receiver email address');
                return;
            }
            else if(validateEmailAddress($scope.emailContent.to)){
                alert('Incorrect email address, Check email address again');
                return;
            }
            $http.post('/emails', $scope.emailContent).then(function (output) {
                console.log(output.data);
                alert(output.data+'Message sent successfully');
                var earl = '/makeOrder/';
                $location.path(earl);
            });
            $http.put('/drugRequests/ordered', $scope.emailData).then(function (success) {
                console.log(success);
            });
            OrderInvoiceService.makeOrder();
        };

        $http.get('/emails').then(function(emailData){
            $scope.emailHistory = emailData.data;
        });
    }
]);