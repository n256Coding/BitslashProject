angular.module('authService',[])

    .factory('AuthInterceptors',function ($window) {
        var  authInterceptorsFactory={}

        authInterceptorsFactory.request=function (config) {
          var token= $window.localStorage.getItem('token');

          if(token){
              config.headers['x-access-token']=token;
          }

          return config;
        };

        return authInterceptorsFactory;
    });
