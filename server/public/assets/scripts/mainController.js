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
        $scope.addButtonText = "Item Added";
        $scope.showCart();;
        $scope.currentCart.push(menuItem);
        shoppingCart.ordersTotal = 0;
        $scope.ordersTotal = 0;
        //re-run the total
        for (var i =0; i < $scope.currentCart.length; i++){
            shoppingCart.ordersTotal += parseFloat($scope.currentCart[i].price);
            $scope.ordersTotal = shoppingCart.ordersTotal;
        }
        //calculate Tax
        $scope.calculateTax($scope.ordersTotal);
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
        //calculate Tax
        $scope.calculateTax($scope.ordersTotal);

        if($scope.ordersTotal == 0 ){
            $scope.hideCart();
        }
    };
    $scope.changeMyOrder = function(){
        $location.path('/appetizers');
        $scope.showCart();
    };

    $scope.checkoutOrder = function(){
        $scope.hideCart();
        $location.path('/completeOrder');

    };

    $scope.calculateTax = function(totalBeforeTax){
        $scope.orderTax = totalBeforeTax * $scope.currentTaxRate;
        $scope.finalTotal = totalBeforeTax + $scope.orderTax;
    };

    $scope.completeOrder = function(){
        //generate a order ID
        $scope.getNewOrderID();

        //generate a Customer ID
        $scope.getNewCustomerID();

        $scope.orderDate = Date.now();

        //post order back to server with new ID
        $http.post('/order', {
            "_id": null,
            "orderDate": $scope.orderDate,
            "orderID": $scope.orderID,
            "cartItems": $scope.currentCart,
            "ordersTotal": $scope.ordersTotal,
            "finalTotal": $scope.finalTotal,
            "customerID": $scope.customerID,
            "customerInfo": $scope.customer
        });

        $scope.addCustomerToDatabase($scope.customer, $scope.customerID );
        $scope.sendAdminEmail();
        $scope.sendCustomerEmail();
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

    $scope.sendAdminEmail = function(){
        $http.post('/mailAdmin', {
            orderDate: $scope.orderDate,
            orderID: $scope.orderID,
            customerID: $scope.customerID,
            fullName: $scope.customer.firstName + " " + $scope.customer.lastName,
            finalTotal: $scope.finalTotal,
            email: $scope.customer.email
        });
    };
    $scope.sendCustomerEmail = function(){
        $http.post('/mailCustomer', {
            orderDate: $scope.orderDate,
            orderID: $scope.orderID,
            customerID: $scope.customerID,
            fullName: $scope.customer.firstName + " " + $scope.customer.lastName,
            finalTotal: $scope.finalTotal,
            email: $scope.customer.email
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
    //          REQUEST FUNCTIONS                      //
    //-------------------------------------------------//

    //-------------------------------------------------//
    //                   ADMIN                         //
    //-------------------------------------------------//
    $scope.orderList = [];
    $scope.loadOrdersList = function(){
        $http.get('/order').then(function(response){
            $scope.orderList = response.data;
        });
    };
    $scope.loadOrdersList();

    $scope.customerList = [];
    $scope.loadCustomerList = function(){
        $http.get('/customer').then(function(response){
            $scope.customerList = response.data;
        });
    };

    $scope.loadCustomerList();

    $scope.menuItemToAdd = {};
    $scope.addMenuItem = function(menuItem){
        $http.post('/menu', menuItem).then( function(){
            $scope.message = "Item Added";
        });
    };
}]);

