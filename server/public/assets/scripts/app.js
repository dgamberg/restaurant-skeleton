var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'firebase'])
    .constant('FIREBASE_URL', 'https://dg-restaurant-users.firebaseio.com/');

//detect any routing error from auth and respond
myApp.run(['$rootScope', '$location', function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function( event, next, previous, error){
        if(error=='AUTH_REQUIRED'){
            $rootScope.message = "Sorry, you must log in to access that page";
            $location.path('/login');
        }
    });
}]);