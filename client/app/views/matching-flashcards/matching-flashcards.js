angular.module('myApp.matchingFlashcardsPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/matching-category/:category', {
    authenticate: true,
    templateUrl: 'views/matching-flashcards/matching-flashcards.html',
    controller: 'matchingCategory'
  });
}])

.controller('matchingCategory', ['$scope', '$route', 'FlashCards', '$timeout', function($scope, $route, FlashCards, $timeout) {

  // Set default min height regarding screen height
  angular.element('.page').css('min-height', window.innerHeight - 40 + 'px');

  $scope.category = $route.current.params.category;

  var cardTotal = 0;
  var cardReturned = 0;
  var firstCard = null;
  var firstCardId = null;
  var secondCard = null;
  var secondCardId = null;
  var inTransition = false;
  var startTime;
  var endTime;
  var totalTime;

  $scope.getFlashCard = function(number) {
    // Add loader
    angular.element('#loader').removeClass('hidden');
    // Hide settings block
    angular.element('.setting-container').addClass('hidden');

    // Get all flashcard from the category
    FlashCards.getFlashcardsByCategory($route.current.params.category).then(function(flashcards){
      var flashcardsObj = flashcards.data;

      // Set an array of flashcards ID
      flashcardsList = [];
      for (var element in flashcardsObj) {
        var obj = {};
        obj[element] = flashcardsObj[element];
        flashcardsList.push(obj);
      }

      //Shuffle the flashcard index list to give an random display on each load
      FlashCards.shuffleFlashcards(flashcardsList);

      var matchingList = [];
      for (var i = 0; i < number / 2; i++) {
        matchingList.push(flashcardsList[i]);
      }

      var finalList = [];

      // Creating the final list from the matching list
      for (var j = 0; j < matchingList.length; j++) {
        for (var elm in matchingList[j]) {
          // create cards objects
          var firstCardObj = {};
          var secondCardObj = {};
          // Check if the card is an image card
          if(matchingList[j][elm].isImg) {
            // Set the term card
            firstCardObj.isMain = true;
            firstCardObj.isImg = true;
            firstCardObj.picture = matchingList[j][elm].picture;
            firstCardObj.id = elm;

            // Set the definition card
            secondCardObj.isMain = false;
            secondCardObj.definition = matchingList[j][elm].definition;
            secondCardObj.id = elm;
          } else {
            // Set the term card
            firstCardObj.isMain = true;
            firstCardObj.isImg = false;
            firstCardObj.term = matchingList[j][elm].term;
            firstCardObj.id = elm;

            // Set the definition card
            secondCardObj.isMain = false;
            secondCardObj.definition = matchingList[j][elm].definition;
            secondCardObj.id = elm;
          }
          // Push the new set of cards into the final list
          finalList.push(firstCardObj,secondCardObj);
        }
      }

      //Shuffle the flashcard index list to give an random display on each load
      FlashCards.shuffleFlashcards(finalList); 
      $scope.flashcards = finalList;
      cardTotal = finalList.length;

      // Remove loader
      angular.element('#loader').remove();
      // Show cards
      angular.element('.flashcards-container').removeClass('hidden');
      // Start the time counter
      var date = new Date();
      startTime = date.getTime();
    });
  };

  $scope.selected = function(card) {
    // Check if 2 cards has always been selected
    if (!inTransition) {
      // Get clicked card information
      var clickedCard = angular.element('.flip-container[data-cardid="'+card.id+'"][data-cardmain="'+card.isMain+'"]');
      // Rotate the card
      clickedCard.addClass('flipped');
      // Check if a first card has already been selected
      if (!firstCard) {
        firstCard = clickedCard;
        firstCardId = card.id;
      } else {
        secondCard = clickedCard;
        secondCardId = card.id;
      }
      cardReturned++;

      // If 2 cards has already been flipped
      if (cardReturned ===  2) {
        // Check if the user selected twice the same card
        if (firstCard.data('cardmain') === secondCard.data('cardmain') && firstCardId === secondCardId) {
          firstCard.removeClass('flipped');
          cardReturned = 0;
          firstCard = null;
          secondCard = null;
          return;
        }
        // Set as in transition, stopping the user form flipping other cards
        inTransition = true;
        // Delay action in order to see the second card flipping
        $timeout(function() {
          // If both card match, remove them from the board
          if (firstCardId === secondCardId) {
            firstCard.css({'opacity':'0'});
            secondCard.css({'opacity':'0'});
            // Decrease the number of card available
            cardTotal -= 2;
            // If no more cards, show the results
            if (cardTotal === 0) {
              // Show results
              angular.element('.replay-container').removeClass('hidden');
              // Hide board
              angular.element('flashcards-container').addClass('hidden');
              var stopDate = new Date();
              endTime = stopDate.getTime();
              totalTime = convertTime(endTime - startTime);
              angular.element('#time-spent').html(totalTime);
            }
          } else {
            // Reset the both card if no match found
            firstCard.removeClass('flipped');
            secondCard.removeClass('flipped');
          }
          // Reset the board variable
          cardReturned = 0;
          firstCard = null;
          secondCard = null;
          inTransition = false;
        }, 700);
      }
    }
  };

  // Reload the game/page-controller
  $scope.reload = function() {
    $route.reload();
  };

  function convertTime(duration) {
    var time = parseInt(duration/1000);
    var minutes, seconds;

    if (time < 10) {
      timeSpent = "0" + time + " seconds";
    } else if (time >= 10 && time < 60) {
      timeSpent = time + " seconds";
    } else {
      minutes = parseInt(time / 60);
      minutes = (minutes === 1) ? minutes + "minute" : minutes + "minutes";
      if (time % 60 === 0) {
        seconds = "";
      } else {
        seconds = " and " + time % 60 + " seconds";
      }
      timeSpent = minutes + seconds;
    }
    return timeSpent;
  }

}]);
