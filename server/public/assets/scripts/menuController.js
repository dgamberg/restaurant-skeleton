myApp.controller('MenuController', ['$scope', '$http', 'shoppingCart', function($scope, $http, shoppingCart){
    //Menu Display
    $scope.menu = {};
    $scope.menuArray = [];
    $scope.ordersTotal = 0;

    $scope.displayMenu = function(){
        $http.get('/menu').then(function(response){
            $scope.menuArray = response.data;
        });
    };
    $scope.displayMenu();

    //Shopping Cart functions
    $scope.currentCart = shoppingCart.getShoppingCart();
    $scope.ordersTotal = shoppingCart.ordersTotal;

    $scope.addToOrder = function(menuItem){
        $scope.currentCart.push(menuItem);
        shoppingCart.ordersTotal = 0;
        $scope.ordersTotal = 0;
        //re-run the total
        for (var i =0; i < $scope.currentCart.length; i++){
            shoppingCart.ordersTotal += parseFloat($scope.currentCart[i].price);
            $scope.ordersTotal = shoppingCart.ordersTotal;
        }
    };

    $scope.removeFromOrder = function(index){
        $scope.currentCart.splice(index, 1);
        shoppingCart.ordersTotal = 0;
        $scope.ordersTotal = 0;
        //re-run the total
        for (var i =0; i < $scope.currentCart.length; i++){
            shoppingCart.ordersTotal += parseFloat($scope.currentCart[i].price);
            $scope.ordersTotal = shoppingCart.ordersTotal;
        }
    };
    //Pull one menu item by ID
    $scope.itemToEdit = {};

    $scope.getItem = function(id){
        $http.get('/menu/:' + id).then(function(data){
            //$scope.itemToEdit = data;
            console.log($scope.itemToEdit);
        });
    };

    $scope.addMenuItem = function(menuItem){
        $http.post('/menu', menuItem).then(function(menuItem){
            //$scope.itemToEdit = data;
            //console.log("Posted" , menuItem);
        });
    }

}]);

