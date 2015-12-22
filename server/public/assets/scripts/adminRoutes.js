//Routes
myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/home', {
            templateUrl: "/views/partials/home.html"
        }).    //ADMIN LINKS
        when('/admin-login', {
            templateUrl: "views/admin/admin-login.html"
        }).
        when('/admin', {
            templateUrl: "views/admin/admin.html"
        }).
        // DASHBOARD MENU
        when('/admin-list-menuItems', {
            templateUrl: "views/admin/admin-list-menuItems.html"
        }).
        when('/admin-add-menuItem', {
            templateUrl: "views/admin/admin-add-menuItem.html"
        }).
        //CUSTOMERS
        when('/admin-add-customer', {
            templateUrl: "views/admin/admin-add-customer.html"
        }).
        when('/admin-list-customers', {
            templateUrl: "views/admin/admin-list-customers.html"
        }).
        when('/admin-live-orders', {
            templateUrl: "views/admin/admin-live-orders.html"
        }).
        when('/failure', {
            templateUrl: "views/customer/failure.html"
        });
}]);