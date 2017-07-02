angular.module('MainControler',[])
    .controller('mainControl',function ($scope,$timeout,$location,$http,$window,$rootScope,$interval,$route) {

       var checkingSeesion,choiceMade;
       var checkSession =function () {
            if($window.localStorage.getItem('token')){
                checkingSeesion = true;
                var interval =$interval(function () {
                    var token =$window.localStorage.getItem('token');

                    if(token === null){
                        $interval.cancel(interval);
                    }else{
                        self.parseJwt =function (token) {
                            var base64Url=token.split('.')[1];
                            var base64 =base64Url.replace('-','+').replace('_','/');
                            return JSON.parse($window.atob(base64));
                        }
                        var expireTime =self.parseJwt(token);
                        var timeStamp =Math.floor(Date.now()/1000);
                        var  timeCheck =expireTime.exp -timeStamp;
                        console.log(timeCheck);
                        if(timeCheck <= 60){
                            console.log('token expired');
                            showModal(1);
                            $interval.cancel(interval);
                        }else{
                            console.log('token noy yet expired');
                        }

                    }

                },2000);
            }
        };

        checkSession();

        var showModal = function (option) {
            choiceMade=false;
            $scope.hideButton=false;
            $scope.modalTitle ='';
            $scope.modalBody='';


            if(option === 1){

                $scope.modalTitle ='Timeout Warning';
                $scope.modalBody='Your session will expired in 2 minites. Would you like to renew your session?';
                $('#myModal').modal({backdrop:'static'});


            }else if(option ===2){
                $scope.hideButton=true;
                $scope.modalTitle ='Logging Out...';
                $('#myModal').modal({backdrop:'static'});

                $timeout(function () {


                    $window.localStorage.removeItem('token');

                    $location.path('/');
                    $('#myModal').modal('hide');

                    $route.reload();



                },5000);

            }

            $timeout(function () {
                if(!choiceMade){
                    $('#myModal').modal('hide');
                }
            },8000);


        };


        $scope.renewSession = function () {
            choiceMade=true;

            console.log($scope.logeduser);
            $http.get('/routers/renewToken/'+$scope.logeduser).then(function (data) {
                    if(data.data.success){
                        $window.localStorage.setItem('token',data.data.token);
                        console.log(data.data.token);
                        checkSession();
                    }else{
                       $scope.modalBody=data.data.message;
                    }
            });


            $('#myModal').modal('hide');
        };


        $scope.endSession = function () {
            choiceMade=true;
         $('#myModal').modal('hide');
            $timeout(function () {
                showModal(2);
            },4000);

        };



        $rootScope.$on('$routeChangeStart',function () {
            if (!checkSession){
                checkSession();
            }

            if($window.localStorage.getItem('token')){
                console.log('user logged in');
                $scope.loggedChecker=true;
                $http.post('/routers/currentuser').then(function (data) {
                    console.log(data);
                    $scope.logeduser=data.data.username;


                    $http.get('/routers/permission').then(function (data) {

                        if(data.data.permission === 'Cheif')
                        {
                            $scope.authorized = true;
                        }else{
                            $scope.authorized = false;
                        }
                    });



                });
            }else {
                console.log('user not logged in');
                $scope.logeduser='';
                $scope.loggedChecker=false;
            }
        });
  /*
        //check token exist in browser
        if($window.localStorage.getItem('token')){
            console.log('sucess loged');
            $http.post('/routers/currentuser').then(function (data) {
                console.log(data);
                $scope.logeduser=data.data.username;
            });
        }else {
            console.log('fail loged');
            //$q.reject({message:'user has no token'});
        }
*/
        $scope.loginUser=function (uname,pword) {

           // $scope.loading=true;
            $scope.errorMsg=false;
            console.log(uname+"/"+pword );

            var login={
                username:uname,
                password:pword
            };

            $http.post('/routers/auth',login).then(function (response) {

                console.log(response.data.message);
                console.log(response.data.success);

                if(response.data.success){

                   // $scope.loading=false;
                    $scope.SucessMsg=true;
                    $scope.rightMsg=response.data.message;


                    //save token in browser
                    $window.localStorage.setItem('token',response.data.token);




                    setTimeout(function ()
                    {
                        $scope.$apply(function()
                        {
                            $scope.SucessMsg=false;

                            $http.get('/routers/permission').then(function (data) {

                                if(data.data.permission === 'Cheif')
                                {
                                    $location.path('/managment');
                                }else{
                                    $location.path('/dispense');
                                }
                            });

                            checkSession();
                        });
                    }, 2000);


                }else{
                   // $scope.loading=false;
                    $scope.errorMsg=true;
                    $scope.wrongMsg=response.data.message;
                    setTimeout(function ()
                    {
                        $scope.$apply(function()
                        {
                            $scope.errorMsg=false;
                        });
                    }, 500);
                }

            });
        };


        $scope.logoutUser = function () {


            showModal(2);

        };



    });