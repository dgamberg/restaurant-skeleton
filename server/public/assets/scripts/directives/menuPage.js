myApp.directive('menuPage', function() {
    return {
        restrict: 'E',
        scope: {
            category: '='
        },
        templateUrl: 'assets/scripts/directives/menu-page.html'
    }
});