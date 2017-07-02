var appModule = angular.module('App',['appRoutes','userControler','MainControler','authService',
    'managmentCon','PrescriptionController','ReqController','newPrescriptionCon','720kb.datepicker','addBatchController',
    'viewBatchController','patientController','viewDrugController', 'ngFileUpload', 'ngMaterial', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(function ($httpProvider) {
        console.log('app con');
        $httpProvider.interceptors.push('AuthInterceptors');
    });


