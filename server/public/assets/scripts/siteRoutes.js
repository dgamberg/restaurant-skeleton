
//Routes
myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/home', {
            templateUrl: "/views/partials/home.html",
        }).

        //MENU CATEGORIES
        when('/appetizers', {
            templateUrl: "views/menu/appetizers.html",
            controller: "MainController"
        }).
        when('/burgers', {
            templateUrl: "views/menu/burgers.html",
            controller: "MainController"
        }).
        when('/salads', {
            templateUrl: "views/menu/salads.html",
            controller: "MainController"
        }).
        when('/sandwiches', {
            templateUrl: "views/menu/sandwiches.html",
            controller: "MainController"
        }).
        when('/kids-menu', {
            templateUrl: "views/menu/kids.html",
            controller: "MainController"
        }).

        // SITE LINKS
        when('/shopping-cart', {
            templateUrl: "views/partials/shoppingCart.html",
            controller: "MainController"
        }).
        when('/about', {
            templateUrl: "views/partials/about.html",
            controller: "MainController"
        }).
        when('/contact', {
            templateUrl: "views/partials/contact.html",
            controller: "MainController"
        }).
        when('/directions', {
            templateUrl: "views/partials/directions.html",
            controller: "MainController"
        }).

        //USER LINKS
        when('/login', {
            templateUrl: "views/customer/login.html",
            controller: "MainController"
        }).
        when('/register', {
            templateUrl: "views/customer/register.html",
            controller: "MainController"
        }).

        //USER LOGIN
        when('/user', {
            templateUrl: "views/admin/user.html",
            controller: "MainController"
        }).

        //ADMIN LINKS
        when('/admin-login', {
            templateUrl: "views/admin/admin-login.html",
            controller: "MainController"
        }).
        when('/admin', {
            templateUrl: "views/admin/admin.html",
            controller: "MainController"
        }).
        // DASHBOARD MENU
        when('/admin-list-menuItems', {
            templateUrl: "views/admin/admin-list-menuItems.html",
            controller: "MainController"
        }).
        when('/admin-add-menuItem', {
            templateUrl: "views/admin/admin-add-menuItem.html",
            controller: "MainController"
        }).
        //CUSTOMERS
        when('/admin-add-customer', {
            templateUrl: "views/admin/admin-add-customer.html",
            controller: "MainController"
        }).

        when('/admin-list-customers', {
            templateUrl: "views/admin/admin-list-customers.html",
            controller: "MainController"
        }).
        when('/admin-live-orders', {
            templateUrl: "views/admin/admin-live-orders.html",
            controller: "MainController"
        }).
        when('/failure', {
            templateUrl: "views/customer/failure.html",
            controller: "MainController"
        }).
        otherwise({
            redirectTo: '/home'
        })
}]);
