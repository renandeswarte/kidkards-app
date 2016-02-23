angular.module('myApp.quizzCategoriesPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/quizz-categories', {
    authenticate: true,
    templateUrl: 'views/quizz-categories/quizz-categories.html',
    controller: 'quizzShowCategories',
  });
}])

.controller('quizzShowCategories',
  ['$scope', '$http', 'FlashCards', 'Categories', 'Display',
  function($scope, $http, FlashCards, Categories, Display) {

  // Center loader to the middle of the page
  Display.centerElement('#loader', true);

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
      window.setTimeout(function() {  
        Display.centerElement('.page');
      }, 50);
    });
  };

}]);
