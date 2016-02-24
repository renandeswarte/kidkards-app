angular.module('myApp.browseCategoriesPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/categories', {
    authenticate: false,
    templateUrl: 'views/browse-categories/browse-categories.html',
    controller: 'showCategories'
  });
}])

.controller('showCategories',
  ['$scope', '$http', 'FlashCards', 'Categories', 'Display',
  function($scope, $http, FlashCards, Categories, Display) {

  // Center loader to the middle of the page
  Display.centerElement('#loader', true);


  // Get categories names
  $scope.getCategories = function() {
    Categories.getCategoriesList().then(function(categories) {
      // Sort Categories by alphabetical order
      var categoriesSorted = [];
      for (var cat in categories) {
        categoriesSorted.push(categories[cat]);
      }
      categoriesSorted.sort(function(a,b) {
        return a.name.localeCompare(b.name);
      });

      // Assign the ordered categories
      $scope.categories = categoriesSorted;

      // Remove loader
      angular.element('#loader').remove();

      // Center content to the middle of the page
      window.setTimeout(function() {
        Display.centerElement('.page');
      }, 50); 
    });
  };
}]);

