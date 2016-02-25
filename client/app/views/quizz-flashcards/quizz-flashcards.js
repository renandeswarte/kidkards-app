angular.module('myApp.quizzFlashcardsPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/quizz-categories/:category', {
    authenticate: false,
    templateUrl: 'views/quizz-flashcards/quizz-flashcards.html',
    controller: 'quizzCategory'
  });
}])

.controller('quizzCategory', ['$scope', '$route', 'FlashCards', 'Display', function($scope, $route, FlashCards, Display) {

  // Center loader to the middle of the page
  Display.centerElement('#loader', true);

  // Get the Category Name
  $scope.category = $route.current.params.category;

  // Initiate main variables
  var flashcards,flashcardsObj,flashcardsList;
  var switchCard = false;
  $scope.flashcard;
  $scope.cardNumber;
  $scope.cardsTotal;
  $scope.sound = true;

  $scope.initMatching = function() {
    // Get all flashcard from the category
    FlashCards.getFlashcardsByCategory($route.current.params.category).then(function(flashcards){
      flashcardsObj = flashcards.data;

      // Set an array of flashcards ID
      flashcardsList = [];
      for (var element in flashcardsObj) {
        flashcardsList.push(element);
      }

      // Shuffle the flashcard index list to give an random display on each load
      FlashCards.shuffleFlashcards(flashcardsList);

      // Set the inital card number and total number of cards
      $scope.cardNumber = 0;
      $scope.cardsTotal = flashcardsList.length - 1;

      // Initiate the first card
      var isImg = flashcardsObj[flashcardsList[$scope.cardNumber]].isImg ? true : false;
      $scope.flashcard = flashcardsObj[flashcardsList[$scope.cardNumber]];

      // Chech next and previous possibilities
      angular.element('.btn.previous').addClass('greyed');
      if ($scope.cardNumber === $scope.cardsTotal) {
        angular.element('.btn.next').addClass('greyed');
        angular.element('.no-more-cards').removeClass('hide');
      }

      checkIsImg(isImg);

      // Remove loader
      angular.element('#loader').remove();
      // Display page elements
      angular.element('.buttons-interaction').show();
      angular.element('.flashcard-container').show();
      angular.element('.how-to').show();

      // Center content to the middle of the page
      window.setTimeout(function() {  
        Display.centerElement('.page');
      }, 50); 
    });
  };

  // Toggle Image or Text flashcard Term display
  var checkIsImg = function(isImg) {
    if (isImg) {
      angular.element('.front .picture-container').addClass('displayed');
      angular.element('.front .term-container').removeClass('displayed');
    } else {
      angular.element('.front .picture-container').removeClass('displayed');
      angular.element('.front .term-container').addClass('displayed');
    }
  };

  $scope.nextCard = function() {
    // If in transition, do not chain the transition effect
    if (!switchCard) {
      switchCard = true;
      angular.element('.card-definition').hide(0).fadeIn(800, function() {
        switchCard = false
      }); 
    }
    angular.element('.flip-container').removeClass('flipped');
    if ($scope.cardNumber < $scope.cardsTotal) {
      $scope.flashcard = flashcardsObj[flashcardsList[++$scope.cardNumber]];
      isImg = flashcardsObj[flashcardsList[$scope.cardNumber]].isImg ? true : false;
      checkIsImg(isImg);
      angular.element('.btn.previous').removeClass('greyed');

      if ($scope.cardNumber === $scope.cardsTotal) {
        angular.element('.btn.next').addClass('greyed');
        angular.element('.no-more-cards').removeClass('hide');
      }
    } else {
      angular.element('.btn.next').addClass('greyed');
      angular.element('.no-more-cards').removeClass('hide');
    }
  };

  $scope.previousCard = function() {
    // If in transition, do not chain the transition effect
    if (!switchCard) {
      switchCard = true;
      angular.element('.card-definition').hide(0).fadeIn(800, function() {
        switchCard = false
      }); 
    }
    angular.element('.flip-container').removeClass('flipped');

    if ($scope.cardNumber > 0) {
      $scope.flashcard = flashcardsObj[flashcardsList[--$scope.cardNumber]];
      isImg = flashcardsObj[flashcardsList[$scope.cardNumber]].isImg ? true : false;
      checkIsImg(isImg);
      if ($scope.cardNumber === 0) {
        angular.element('.btn.previous').addClass('greyed');
      }
      if ($scope.cardNumber === $scope.cardsTotal -1){
        angular.element('.no-more-cards').addClass('hide');
        angular.element('.btn.next').removeClass('greyed');
      }
    } else {
      angular.element('.btn.previous').addClass('greyed');
    }
  };

  // Toggle sound on card reveal
  $scope.toggleSound = function() {
    $scope.sound = !($scope.sound);
  }

  // The definition is synthetized and speaked up if the sound is enable and the card is flipped
  $scope.sayCardContent = function(definition) {
    if (angular.element('.flip-container').hasClass('flipped') && $scope.sound) {
      responsiveVoice.speak(definition);
    }
  };

  // allow user to swipe cards
  $('.flip-container').on('swiperight', function() {
    $scope.previousCard();
    $scope.$apply();
    $('.how-to.swipe').fadeOut();
  });
  $('.flip-container').on('swipeleft', function() {
    $scope.nextCard();
    $scope.$apply();
    $('.how-to.swipe').fadeOut();
  });
}])

// Used to update the background image of the flashcards
.directive('backImg', function(){
  return function(scope, element, attrs){
    attrs.$observe('backImg', function(value) {
      element.css({
        'background': 'url(' + value +')',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-position': '50% 50%'
      });
    });
  };
});
