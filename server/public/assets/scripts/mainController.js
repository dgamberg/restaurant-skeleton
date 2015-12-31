myApp.controller('MainController', ['$scope',  '$http', 'shoppingCart', '$location',
    function($scope, $http, shoppingCart, $location){
    //Menu Display
    $scope.menu = {};
    $scope.menuArray = [];
    $scope.ordersTotal = 0;
    $scope.cartIsVisible = false;
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
        $scope.showCart();
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
        if($scope.ordersTotal == 0 ){
            $scope.hideCart();
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
            console.log("Posted" , menuItem);
        });
    };

    $scope.clearCart = function(){
        $scope.hideCart();
        $scope.currentCart = [];
        $scope.ordersTotal = 0;
    };

    $scope.checkoutOrder = function(){
        $location.path('/completeOrder');
        $scope.hideCart();
    };

    $scope.startOver = function(){
        $location.path('/home');
        $scope.clearCart();
    };

    $scope.changeMyOrder = function(){
        $location.path('/appetizers');
        $scope.showCart();
    };

    $scope.hideCart = function(){
        $scope.cartIsVisible = false;
    };

    $scope.showCart = function(){
        $scope.cartIsVisible = true;
    };

    $scope.getNewOrderID = function(){
        $http.get('/orderID').then(function(response){
            $scope.orderID = response.data.orderID;
            $scope.orderID++;
            $scope.postNewIDToServer($scope.orderID);
        });
    };
    $scope.postNewIDToServer = function(id){
        $http.post('/orderID', {
            orderID: id
        }).then(function(){
            console.log("New ID Posted ",  id);
        });
    };

    $scope.newCustomer = {};
    $scope.fullOrder = {};
    $scope.completeOrder = function(){
        //get a new order ID
        $scope.getNewOrderID();

            $http.post('/order', {

                "_id": null,
                "orderDate": Date.now(),
                "orderId": $scope.orderID,
                "cartItems": $scope.currentCart,
                "cartTotal":  $scope.ordersTotal,
                "customerId": "123"
            }).then(function(){
                console.log("Order Posted ",  $scope.orderID);
            });
    };

}]);

