//Routes
myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/home', {
            templateUrl: "/views/partials/home.html"
        }).
        //MENU CATEGORIES
        when('/menu', {
            template: "<menu-page></menu-page>"
        }).

        // SITE LINKS
        when('/shopping-cart', {
            templateUrl: "views/partials/shoppingCart.html"
        }).
        when('/about', {
            templateUrl: "views/partials/about.html"
        }).
        when('/contact', {
            templateUrl: "views/partials/contact.html"
        }).
        when('/directions', {
            templateUrl: "views/partials/directions.html"
        }).

        //USER LINKS
        when('/login', {
            templateUrl: "views/customer/login.html",
            controller: "RegistrationController"
        }).
        when('/register', {
            templateUrl: "views/customer/register.html",
            controller: "RegistrationController"
        }).
        //Form Links
        when('/completeOrder', {
            templateUrl: "views/customer/completeOrder.html"
        }).
        when('/thankYou', {
            templateUrl: "views/customer/thankYou.html"
        }).

        //USER LOGIN
        when('/user', {
            templateUrl: "views/admin/user.html"
        }).

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
        when('/admin-list-orders', {
            templateUrl: "views/admin/admin-list-orders.html"
        }).


        otherwise('/home', {
            templateUrl: "/views/partials/home.html"
        });
}]);
