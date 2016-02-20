angular.module('myApp.browseCategoriesPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/categories', {
    authenticate: true,
    templateUrl: 'views/browse-categories/browse-categories.html',
    controller: 'showCategories'
  });
}])

.controller('showCategories',
  ['$scope', '$http', 'FlashCards', 'Categories',
  function($scope, $http, FlashCards, Categories) {

  // Set default min height regarding screen height
  angular.element('.page').css('min-height', window.innerHeight - 40 + 'px');

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
    });
  };

}]);

