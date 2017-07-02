angular.module('viewDrugController',[])
    .controller('viewDrugController',function ($scope, $rootScope, $window, $http) {

        console.log('drug controler loaded');
        $http.get('/viewDrug/api/getalldrugs').then(function (response) {
            $scope.drugDetailsList = response.data;
            console.log(response.data)
        });
        $http.get('/viewDrug/api/getdrugstock').then(function (response) {
            $scope.drugStocks = response.data;
        });

        $scope.getDrugTypes = function () {
            $http.get('/viewDrug/api/getdrugtypes').then(function (response) {
                $scope.drugs = response.data;
            });
        };

        $scope.getDrugCategories = function () {
            $http.get('/viewDrug/api/getdrugcategories').then(function (response) {
                $scope.drugs = response.data;
            });
        };

        var refresh=function(){
            $scope.getDrugs = function () {
                $http.get('/viewDrug/api/getalldrugs').then(function (response) {
                    $scope.drugs = response.data;
                    console.log(response.data);
                });
            };
        };

        $scope.getDrugs = function () {
            $http.get('/viewDrug/api/getalldrugs').then(function (response) {
                $scope.drugDetailsList = response.data;
                console.log(response.data)
            });
        };

        $scope.getDrugStock = function () {
            $http.get('/viewDrug/api/getdrugstock').then(function (response) {
                $scope.drugs = response.data;
            });
        };

        $scope.getDrugTypes = function () {
            $http.get('/viewDrug/api/drugtypes').then(function (response) {

                $rootScope.searchItems = ["apple","dodam"];
                /*
                 angular.forEach(response.data, function (item) {
                 searchItems.push(item.drugType);
                 });
                 */
                $rootScope.searchItems.sort();
                $rootScope.suggestions = [];
                $rootScope.selectedIndex = -1;

                $rootScope.search = function () {
                    $rootScope.suggestions = [];
                    var myMaxSuggestionListLength = 0;
                    for (var i = 0; i < $rootScope.searchItems.length; i++) {
                        var searchItemsSmallLetters = angular.lowercase($rootScope.searchItems[i]);
                        var searchTextSmallLetters = angular.lowercase($rootScope.searchText);
                        if (searchItemsSmallLetters.indexOf(searchTextSmallLetters) !== -1) {
                            $rootScope.suggestions.push(searchItemsSmallLetters);
                            myMaxSuggestionListLength += 1;
                            if (myMaxSuggestionListLength == 5) {
                                break;
                            }
                        }
                    }
                }

                $rootScope.$watch('selectedIndex', function (val) {
                    if (val !== -1) {
                        $scope.searchText = $rootScope.suggestions[$rootScope.selectedIndex];
                    }
                });

                $rootScope.checkKeyDown = function (event) {
                    if (event.keyCode === 40) {
                        event.preventDefault();
                        if ($rootScope.selectedIndex + 1 !== $rootScope.suggestions.length) {
                            $rootScope.selectedIndex++;
                        }
                    } else if (event.keyCode === 38) {
                        event.preventDefault();
                        if ($rootScope.selectedIndex - 1 !== -1) {
                            $rootScope.selectedIndex--;
                        }
                    } else if (event.keyCode === 13) {
                        event.preventDefault();
                        $rootScope.suggestions = [];
                    }
                }

                $rootScope.checkKeyUp = function (event) {
                    if (event.keyCode !== 8 || event.keyCode !== 46) {//delete or backspace
                        if ($scope.searchText == "") {
                            $rootScope.suggestions = [];
                        }
                    }
                }

                $rootScope.AssignValueAndHide = function (index) {
                    $scope.searchText = $rootScope.suggestions[index];
                    $rootScope.suggestions = [];
                }

            });
        };

        $scope.getDrug = function () {
            $http.get('/viewDrug/api/getdrug/:_id').then(function (response) {
                $scope.drug = response;
            });
        };

        $scope.addNewDrug = function () {
            $http.post('/viewDrug/api/addnewdrug/', $scope.drug)
                .then(function (response) {
                    refresh();
                    $window.alert(response.data.message);
                });
        };

        $scope.addtoDrugStock = function () {
            $http.post('/viewDrug/api/addtoStock/', $scope.drugs)
                .then(function (response) {
                    $window.alert("Drugs added to stock successfully");
                });
        };

        $scope.updateDrugDetails = function () {
            $scope.json={
                "id":$scope.id,
                "name":$scope.name,
                "type":$scope.type,
                "category":$scope.category,
                "price":$scope.price,
                "reorderLvl":$scope.reorderLvl,
                "dangerLvl":$scope.dangerLvl,
                "provider":$scope.provider,
                "providerEmail":$scope.providerEmail,
                "remarks":$scope.remarks
            }
            $http.put('/viewDrug/api/updateDetails/', $scope.json)
                .then(function (response) {
                    refresh();
                    $window.alert(response.data.message);
                });
        };

        $scope.saveVariableId=function (id) {
            $scope.savedVariable=id;
            $scope.id=$scope.savedVariable._id;
            $scope.name=$scope.savedVariable.name;
            $scope.type=$scope.savedVariable.type;
            $scope.category=$scope.savedVariable.category;
            $scope.price=$scope.savedVariable.price;
            $scope.reorderLvl=$scope.savedVariable.reorderLvl;
            $scope.dangerLvl=$scope.savedVariable.dangerLvl;
            $scope.provider=$scope.savedVariable.provider;
            $scope.providerEmail=$scope.savedVariable.providerEmail;
            $scope.remarks=$scope.savedVariable.remarks;
        }



    });


appModule.controller('uploadCtrl2', ['Upload', '$window', function (Upload, $window) {
    var vm = this;
    vm.submit = function () {
        if (vm.upload_form.file.$valid && vm.file) {
            vm.upload(vm.file);
        }
    }

    vm.upload = function (file) {
        Upload.upload({
            url: '/api/drugs/receiveddetailsuploads',
            data: {file: file}
        }).then(function (resp) {
            if (resp.data.error_code === 0) {
                $window.alert(resp.config.data.file.name + ' uploaded Successfully');
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) {
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% ';

        });
    };
}]);


appModule.controller('uploadCtrl', ['Upload', '$window', function (Upload, $window) {
    var vm = this;
    vm.submit = function () {
        if (vm.upload_form.file.$valid && vm.file) {
            vm.upload(vm.file);
        }
    }

    vm.upload = function (file) {
        Upload.upload({
            url: '/api/drugs/newdetailsuploads',
            data: {file: file}
        }).then(function (resp) {
            if (resp.data.error_code === 0) {
                $window.alert(resp.config.data.file.name + ' uploaded Successfully');
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) {
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% ';
        });
    };
}]);