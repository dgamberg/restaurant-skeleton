myApp.controller('RegistrationController', ['$scope', '$firebaseAuth',

    function( $scope, $firebaseAuth ){
        console.log('Registration Controller Loaded');
        var ref = new Firebase('https://dg-restaurant-users.firebaseio.com/');
        var auth = $firebaseAuth(ref);

        $scope.login = function(){
            $scope.message = "Welcome " + $scope.user.username;
            $scope.loginForm = {};
        };

        $scope.register = function(){
            $scope.message = "Thank You for registering, " + $scope.user.firstName;
            //auth.createUser({
            //
            //}).then(function(regUser){
            //
            //}).catch(function(error){
            //
            //});
            $scope.registrationForm = {};

        }; //register
}]); // Controller