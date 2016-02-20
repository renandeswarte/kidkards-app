angular.module('myApp.homepage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    authenticate: true,
    templateUrl: 'view/home/home.html',
    controller: 'homepage'
  });
}])

.controller('homepage', ['$scope', '$http', 'Categories', 'FlashCards', function($scope, $http, Categories, FlashCards) {

  // Set default min height regarding screen height
  angular.element('.page').css('min-height', window.innerHeight - 40 + 'px');

  $scope.initialize = function() {
    // Categories.getCategoriesList().then(function(categories) {
    //   $scope.categories = categories;
    // });

    // Get the 6 latest flashcards created
    FlashCards.getLastestFlashcards().then(function(flashcards){
      $scope.flashcards = flashcards.data;
      // Remove loader
      angular.element('#loader').remove();
    })
  }
}]);
