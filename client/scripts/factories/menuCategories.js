//Menu Categories Factory
myApp.factory('menuCategories', function(){
    var currentCategories = ["Appetizers", "Salads", "Burgers", "Sandwiches", "Kids"];
    var menuCategories = {};

    menuCategories.getMenuCategories = function(){
        return currentCategories;
    }
    return menuCategories;
});