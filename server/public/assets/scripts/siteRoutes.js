
//Routes
myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/home', {
            templateUrl: "/views/partials/home.html",
        }).

        //MENU CATEGORIES
        when('/appetizers', {
            templateUrl: "views/menu/appetizers.html",
            controller: "MenuController"
        }).
        when('/burgers', {
            templateUrl: "views/menu/burgers.html",
            controller: "MenuController"
        }).
        when('/salads', {
            templateUrl: "views/menu/salads.html",
            controller: "MenuController"
        }).
        when('/sandwiches', {
            templateUrl: "views/menu/sandwiches.html",
            controller: "MenuController"
        }).
        when('/kids-menu', {
            templateUrl: "views/menu/kids.html",
            controller: "MenuController"
        }).

        // SITE LINKS
        when('/shopping-cart', {
            templateUrl: "views/partials/shoppingCart.html",
            controller: "MenuController"
        }).
        when('/about', {
            templateUrl: "views/partials/about.html",
            controller: "MenuController"
        }).
        when('/contact', {
            templateUrl: "views/partials/contact.html",
            controller: "MenuController"
        }).
        when('/directions', {
            templateUrl: "views/partials/directions.html",
            controller: "MenuController"
        }).

        //USER LINKS
        when('/login', {
            templateUrl: "views/customer/login.html",
            controller: "MenuController"
        }).
        when('/register', {
            templateUrl: "views/customer/register.html",
            controller: "MenuController"
        }).

        //USER LOGIN
        when('/user', {
            templateUrl: "views/admin/user.html",
            controller: "MenuController"
        }).

        //ADMIN LINKS
        when('/admin-login', {
            templateUrl: "views/admin/admin-login.html",
            controller: "MenuController"
        }).
        when('/admin', {
            templateUrl: "views/admin/admin.html",
            controller: "MenuController"
        }).
        // DASHBOARD MENU
        when('/admin-list-menuItems', {
            templateUrl: "views/admin/admin-list-menuItems.html",
            controller: "MenuController"
        }).
        when('/admin-add-menuItem', {
            templateUrl: "views/admin/admin-add-menuItem.html",
            controller: "MenuController"
        }).
        //CUSTOMERS
        when('/admin-add-customer', {
            templateUrl: "views/admin/admin-add-customer.html",
            controller: "CustomerController"
        }).

        when('/admin-list-customers', {
            templateUrl: "views/admin/admin-list-customers.html",
            controller: "CustomerController"
        }).
        when('/admin-live-orders', {
            templateUrl: "views/admin/admin-live-orders.html",
            controller: "CustomerController"
        }).
        when('/failure', {
            templateUrl: "views/customer/failure.html",
            controller: "MenuController"
        }).
        otherwise({
            redirectTo: '/home'
        })
}]);
