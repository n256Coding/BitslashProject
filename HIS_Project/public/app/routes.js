var app=angular.module('appRoutes',['ngRoute'])


.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {

            templateUrl:'app/views/pages/home.html',
            authenticated:false

        }).when('/dispense', {

            templateUrl:'app/views/pages/dispense.html',
            controller : 'dispenseController',
            authenticated :true,
            permission:['Assistant']

        }).when('/request', {

            templateUrl:'app/views/pages/request.html',
            controller : 'requestController',
            authenticated :true,
            permission:['Assistant']

        }).when('/newPrescription', {

            templateUrl:'app/views/pages/newPrescription.html',
            controller : 'newperscriptionConntroller',
            authenticated :true,
            permission:['Assistant']

        }).when('/logout', {

            templateUrl:'app/views/pages/logout.html',
            authenticated :true

        }).when('/login', {

            templateUrl:'app/views/pages/login.html',
            authenticated:false
        //controller:'logControl'
        }).when('/managment', {

            templateUrl:'app/views/pages/managment.html',
            controller : 'managmentConntroller',
            authenticated :true,
            permission:['Cheif']

        })
        .when('/orderViewer', {

            templateUrl:'app/views/pages/viewOrder.html',
            controller : 'viewOrderConntroller',
            authenticated :true,
            permission:['Cheif']

        }).when('/emailSender', {

            templateUrl:'app/views/pages/emailViewer.html',
            controller : 'emailController',
            authenticated :true,
            permission:['Cheif']

        }).when('/makeOrder', {

            templateUrl:'app/views/pages/makeOrder.html',
            controller : 'drugRequestController',
            authenticated :true,
            permission:['Cheif']

        })
        .when('/addBatch', {

            templateUrl:'app/views/pages/addBatch.html',
            controller : 'addBatchController',
            authenticated :true,
            permission:['Cheif']

        })
        .when('/viewBatch', {

            templateUrl:'app/views/pages/viewBatch.html',
            controller : 'viewBatchController',
            authenticated :true,
            permission:['Cheif']

        })
        .when('/patient', {

            templateUrl:'app/views/pages/patient.html',
            controller : 'patientController',
            authenticated :true,
            permission:['Cheif']

        })
        .when('/viewDrug', {

            templateUrl:'app/views/pages/viewDrug.html',
            controller : 'viewDrugController',
            authenticated :true,
            permission:['Cheif']

        })
        .when('/viewStock', {

            templateUrl:'app/views/pages/viewStock.html',
            controller : 'viewDrugController',
            authenticated :true,
            permission:['Cheif']

        })
        .when('/addDrug', {

            templateUrl:'app/views/pages/addDrugs.html',
            authenticated :true,
            permission:['Cheif']

        })
        .otherwise({

            redirectTo: '/'

        });

}]);

app.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val.replace(/[^0-9]/g, '');

                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits,10);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});

app.run(['$rootScope','$location','$window','$http',function ($rootScope,$location,$window,$http) {
    $rootScope.$on('$routeChangeStart',function (event,next,current) {

        if(next.$$route.authenticated ==true){

            if(!$window.localStorage.getItem('token')){
               event.preventDefault();
               $location.path('/');
               console.log('shoud authonticated');
            }else if(next.$$route.permission){

                $http.get('/routers/permission').then(function (data) {

                    if(next.$$route.permission[0] !== data.data.permission)
                    {
                        event.preventDefault();
                        //$location.path('/');
                        $http.get('/routers/permission').then(function (data) {

                            if(data.data.permission === 'Cheif')
                            {
                                $location.path('/managment');
                            }else{
                                $location.path('/dispense');
                            }
                        });
                    }
                });
            }

        }else if(next.$$route.authenticated == false){

            if($window.localStorage.getItem('token')){
                event.preventDefault();
                //$location.path('/');
                $http.get('/routers/permission').then(function (data) {

                    if(data.data.permission === 'Cheif')
                    {
                        $location.path('/managment');
                    }else{
                        $location.path('/dispense');
                    }
                });
            }
        }else{
            console.log('dont care');
        }

    });

}]);