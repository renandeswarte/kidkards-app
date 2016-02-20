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

  var menuHeight = 50 + 20;
  var initialCardHeight;

  $scope.expand = function($event) {
    initialCardHeight = initialCardHeight || angular.element($event.currentTarget).height();

    if(document.body.clientWidth < 480 ) {
      angular.element($event.currentTarget).toggleClass('expanded');
      var elementHeight = angular.element($event.currentTarget).height();
      var position = angular.element($event.currentTarget).offset();

      if (position.left > 0) {
        angular.element($event.currentTarget).addClass('right-element-expanded');
        $('html, body').animate({
          scrollTop: position.top + elementHeight - menuHeight
        }, 500);
      } else if (angular.element($event.currentTarget).hasClass('right-element-expanded')) {
        angular.element($event.currentTarget).removeClass('right-element-expanded');
        $('html, body').animate({
          scrollTop: position.top - initialCardHeight - menuHeight
        }, 500);
      }
    }
  }

}]);
