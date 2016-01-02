myApp.controller('MainController', ['$scope',  '$http', 'shoppingCart', '$location',
    function($scope, $http, shoppingCart, $location){

        //-------------------------------------------------//
        //         Menu Display FUNCTIONS                 //
        //-------------------------------------------------//
        $scope.menuArray = [];
        $scope.displayMenu = function(){
            $http.get('/menu').then(function(response){
                $scope.menuArray = response.data;
            });
        };
        $scope.displayMenu();

        //-------------------------------------------------//
        //         Shopping Cart FUNCTIONS                 //
        //-------------------------------------------------//
        $scope.cartIsVisible = false;
        $scope.currentCart = shoppingCart.getShoppingCart();
        $scope.ordersTotal = shoppingCart.ordersTotal;

        $scope.clearCart = function(){
            $scope.hideCart();
            $scope.currentCart = [];
            $scope.ordersTotal = 0;
        };

        $scope.startOver = function(){
            $location.path('/appetizers');
            $scope.clearCart();
        };

        $scope.hideCart = function(){
            $scope.cartIsVisible = false;
        };

        $scope.showCart = function(){
            $scope.cartIsVisible = true;
        };

        //-------------------------------------------------//
        //              Order FUNCTIONS                    //
        //-------------------------------------------------//

        $scope.ordersTotal = 0;
        $scope.finalTotal = 0;
        $scope.currentTaxRate = .068;
        $scope.orderTax = 0;

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
            $scope.orderTax = $scope.ordersTotal * $scope.currentTaxRate;
            $scope.finalTotal = $scope.ordersTotal + $scope.orderTax;
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
            $scope.orderTax = $scope.ordersTotal * $scope.currentTaxRate;
            $scope.finalTotal = $scope.ordersTotal + $scope.orderTax;
            if($scope.ordersTotal == 0 ){
                $scope.hideCart();
            }
        };
        $scope.changeMyOrder = function(){
            $location.path('/appetizers');
            $scope.showCart();
        };

        $scope.checkoutOrder = function(){
            $location.path('/completeOrder');
            $scope.hideCart();
        };

        $scope.completeOrder = function(){
            //generate a order ID
            $scope.getNewOrderID();

            //generate a Customer ID
            $scope.getNewCustomerID();

            //post order back to server with new ID
            $http.post('/order', {
                "_id": null,
                "orderDate": Date.now(),
                "orderID": $scope.orderID,
                "cartItems": $scope.currentCart,
                "ordersTotal": $scope.ordersTotal,
                "finalTotal": $scope.finalTotal,
                "customerID": $scope.customerID,
                "customerInfo": $scope.customer
            });
            $scope.addCustomerToDatabase($scope.customer, $scope.customerID );
            $location.path('/thankYou');
        };

        $scope.customer = {};
        $scope.addCustomerToDatabase = function(customer, id){
            $http.post('/customer', {
                "customerID": id,
                "firstName" : customer.firstName,
                "lastName" : customer.lastName,
                "email" : customer.email,
                "street" : customer.street,
                "city" : customer.city,
                "state" : customer.state,
                "zip" : customer.zip
            });
        };


        //-------------------------------------------------//
        //              ORDER ID FUNCTIONS                 //
        //-------------------------------------------------//

        $scope.getNewOrderID = function(){
            // get the current order ID
            $http.get('/orderID').then(function(response){
                // put it in order ID
                $scope.orderID = response.data.orderID;
                //increment order ID
                $scope.orderID++;
                //save new ID Back to server
                $scope.postNewOrderIDToServer($scope.orderID);
            });
        };

        $scope.loadCurrentOrderID = function(){
            // get the current order ID
            $http.get('/orderID').then(function(response){
                // put it in order ID
                $scope.orderID = response.data.orderID;
                //increment order ID
            });
        };
        $scope.loadCurrentOrderID();


        $scope.postNewOrderIDToServer = function(id){
            //take the ID passed in and post to server
            $http.post('/orderID', {
                orderID: id
            });
        };

        //-------------------------------------------------//
        //              CUSTOMER ID FUNCTIONS              //
        //-------------------------------------------------//

        $scope.loadCurrentCustomerID = function(){
            // get the current order ID
            $http.get('/customerID').then(function(response){
                // put it in order ID
                $scope.customerID = response.data.customerID;
                //increment order ID
            });
        };
        $scope.loadCurrentCustomerID();

        $scope.getNewCustomerID = function(){
            // get the current order ID
            $http.get('/customerID').then(function(response){
                // put it in order ID
                $scope.customerID = response.data.customerID;
                //increment order ID
                $scope.customerID++;
                //save new ID Back to server
                $scope.postNewCustomerIDToServer($scope.customerID);
            });
        };

        $scope.postNewCustomerIDToServer = function(id){
            //take the ID passed in and post to server
            $http.post('/customerID', {
                customerID: id
            });
        };

        //-------------------------------------------------//
        // ADMIN FUNCTIONS - TRANSFER TO ADMIN CONTROLLER  //
        //-------------------------------------------------//

        //Pull one menu item by ID
        //$scope.itemToEdit = {};
        //$scope.getItem = function(id){
        //    $http.get('/menu/:' + id).then(function(data){
        //        //$scope.itemToEdit = data;
        //        console.log($scope.itemToEdit);
        //    });
        //};

        $scope.addMenuItem = function(menuItem){
            $http.post('/menu', menuItem).then( function(menuItem){
                $scope.message = "Item Added";
            });
        };
}]);

