angular.module('myApp.browseFlashcardsPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/categories/:category', {
    authenticate: true,
    templateUrl: 'view/browse-flashcards/browse-flashcards.html',
    controller: 'browseFlashcards'
  });
}])

.controller('browseFlashcards', ['$scope', '$route', 'FlashCards', function($scope, $route, FlashCards) {

  // Set default min height regarding screen height
  angular.element('.page').css('min-height', window.innerHeight - 40 + 'px');

  $scope.category = $route.current.params.category;

  // Get all flashcard from the category
  FlashCards.getFlashcardsByCategory($route.current.params.category).then(function(flashcards){
    $scope.flashcards = flashcards.data;
    // Remove loader
    angular.element('#loader').remove();
  });

}]);
