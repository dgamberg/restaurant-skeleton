myApp.controller('CustomerController', ['$scope', '$http',  function($scope, $http){
    //List Customers
    $scope.customersArray = [];
    $scope.customer = {};
    $scope.listCustomers = function(){
        $http.get('/customer').then(function(data){
            $scope.customersArray = data;
        });
    };

    $scope.addCustomer = function(response){
        $http.post('/customer', response).then(function(response){

        });
    }

}]);