angular.module('myApp.browseFlashcardsPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/categories/:category', {
    authenticate: false,
    templateUrl: 'views/browse-flashcards/browse-flashcards.html',
    controller: 'browseFlashcards'
  });
}])

.controller('browseFlashcards', ['$scope', '$route', 'FlashCards', 'Display', '$timeout', function($scope, $route, FlashCards, Display, $timeout) {

  // Center loader to the middle of the page
  Display.centerElement('#loader', true);

  $scope.category = $route.current.params.category;

  // Get all flashcard from the category
  FlashCards.getFlashcardsByCategory($route.current.params.category).then(function(flashcards){
    $scope.flashcards = flashcards.data;
    // Remove loader
    angular.element('#loader').remove();
    // Center content to the middle of the page
    window.setTimeout(function() {  
      Display.centerElement('.page');
    }, 50); 
  });

  var initialCardHeight;
  $scope.expandedCard = false;

  $scope.expand = function($event) {
    initialCardHeight = initialCardHeight || angular.element($event.currentTarget).height();

    if(document.body.clientWidth < 480 ) {
      var position = angular.element($event.currentTarget).offset();

      if (angular.element($event.currentTarget).hasClass('expanded')) {
        // Check is card is already expanded
        angular.element($event.currentTarget).css('transform', 'none');
        if (angular.element($event.currentTarget).hasClass('right-element-expanded')) {
          angular.element($event.currentTarget).removeClass('right-element-expanded');  
        }
        $timeout(function(){angular.element($event.currentTarget).removeClass('expanded')}, 500);
        $scope.expandedCard = false;
      } else if (position.left === 0 && !angular.element($event.currentTarget).hasClass('expanded')) {
        // Lfet Card case
        // Check if other cards are already expanded
        if ($scope.expandedCard) {
          angular.element('.flashcard-element.expanded')
          .addClass('previous')
          .removeClass('expanded')
          .removeClass('right-element-expanded')
          .css('transform', 'none');
        }
        angular.element($event.currentTarget).css('transform', 'scaleX(2) scaleY(2) translateX(25%) translateY(25%)');
        angular.element($event.currentTarget).addClass('expanded');
        $scope.expandedCard = true;
        $timeout(function(){angular.element('.flashcard-element.previous').removeClass('previous')}, 500);
      } else if (position.left > 0) {
        // Right Card case
        // Check if other cards are already expanded
        if ($scope.expandedCard) {
          angular.element('.flashcard-element.expanded')
          .addClass('previous')
          .removeClass('expanded')
          .removeClass('right-element-expanded')
          .css('transform', 'none');
        }
        angular.element($event.currentTarget).addClass('expanded').addClass('right-element-expanded');
        angular.element($event.currentTarget).css('transform', 'scaleX(2) scaleY(2) translateX(-25%) translateY(25%)');
        $scope.expandedCard = true;
        $timeout(function(){angular.element('.flashcard-element.previous').removeClass('previous')}, 500);
      }
    }
  }
}]);
