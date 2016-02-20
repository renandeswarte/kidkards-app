angular.module('myApp.flashcardDirective', [])

.directive('flashcardElement', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'directives/flashcard.html',
  };
});
