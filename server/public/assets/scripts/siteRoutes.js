//Routes
myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/home', {
            templateUrl: "/views/partials/home.html"
        }).
        //MENU CATEGORIES
        when('/appetizers', {
            templateUrl: "views/menu/appetizers.html"
        }).
        when('/burgers', {
            templateUrl: "views/menu/burgers.html"
        }).
        when('/salads', {
            templateUrl: "views/menu/salads.html"
        }).
        when('/sandwiches', {
            templateUrl: "views/menu/sandwiches.html"
        }).
        when('/kids-menu', {
            templateUrl: "views/menu/kids.html"
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
            templateUrl: "views/customer/login.html"
        }).
        when('/register', {
            templateUrl: "views/customer/register.html"
        }).

        //USER LOGIN
        when('/user', {
            templateUrl: "views/admin/user.html"
        });
}]);
