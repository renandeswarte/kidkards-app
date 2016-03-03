angular.module('myApp.quizzFlashcardsPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/quizz-categories/:category', {
    authenticate: false,
    templateUrl: 'views/quizz-flashcards/quizz-flashcards.html',
    controller: 'quizzCategory'
  });
}])

.directive('onFinishRender', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      if (scope.$last === true) {
        $timeout(function () {
          scope.$emit('ngRepeatFinished');
        });
      }
    }
  }
}])

.controller('quizzCategory', ['$scope', '$route', 'FlashCards', 'Display', function($scope, $route, FlashCards, Display) {

  // Center loader to the middle of the page
  Display.centerElement('#loader', true);

  // Get the Category Name
  $scope.category = $route.current.params.category;

  // Initiate main variables
  var flashcards,flashcardsObj,flashcardsList;
  // $scope.flashcard;
  $scope.flashcards;
  $scope.sound = true;

  $scope.initMatching = function() {
    // Get all flashcard from the category
    FlashCards.getFlashcardsByCategory($route.current.params.category).then(function(flashcards){
      flashcardsObj = flashcards.data;
      
      // Set an array of flashcards ID
      flashcardsList = [];
      for (var element in flashcardsObj) {
        flashcardsList.push(flashcardsObj[element]);
      }

      // Shuffle the flashcard index list to give an random display on each load
      $scope.flashcards = FlashCards.shuffleFlashcards(flashcardsList);
    });
  };

  $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
    $scope.swiper = new Swiper('.swiper-container', {
      effect: 'coverflow',
      centeredSlides: true,
      slidesPerView: 'auto',
      followFinger: true,
      coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : false
      }
    });

    // Remove loader
    angular.element('#loader').remove();

    // Display page elements
    angular.element('.buttons-interaction').show();
    angular.element('.how-to').show();    

    // Center content to the middle of the page
    window.setTimeout(function() {  
      Display.centerElement('.page');
      angular.element('.swiper-container').css('opacity','1');

      // Display page elements
         // Display page elements
    }, 50); 
  });

  // Toggle sound on card reveal
  $scope.toggleSound = function() {
    $scope.sound = !($scope.sound);
  }

  $scope.flip = function($event, definition) {
    if (angular.element($event.currentTarget).parent().hasClass('swiper-slide-active')) {
      angular.element($event.currentTarget).toggleClass('flipped');
      if (angular.element($event.currentTarget).hasClass('flipped') && $scope.sound) {
        responsiveVoice.speak(definition);
      }
    }
  }
}]);
