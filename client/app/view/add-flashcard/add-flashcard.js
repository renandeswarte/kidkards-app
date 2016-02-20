angular.module('myApp.addFlashcardPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add-flashcard', {
    authenticate: true,
    templateUrl: 'view/add-flashcard/add-flashcard.html',
    controller: 'addFlashcard'
  });
}])

.controller('addFlashcard',
  ['$scope', '$http', 'FlashCards', 'Categories', '$location',
  function($scope, $http, FlashCards, Categories, $location) {

    // Set default min height regarding screen height
    angular.element('.page').css('min-height', window.innerHeight - 40 + 'px');

    // All categories
    $scope.getCategories = function() {
      Categories.getCategoriesList().then(function(categories) {

        // Sort Categories by alphabetical order
        var categoriesSorted = [];
        for (var cat in categories) {
          categoriesSorted.push(categories[cat].name);
        }
        categoriesSorted.sort();

        $scope.categories = categoriesSorted;
      });
    };

    // Add new category inputed and set it to the dropdown input
    $scope.addNewCategory = function(type) {
      var selectForm = document.getElementById('category-list-' + type);
      var option = document.createElement('option');
      option.text = angular.element('#add-new-category-' + type).val();
      option.setAttribute('data-new', true);
      selectForm.add(option, selectForm[0]);
      selectForm.options[0].selected = true;
    }

    $scope.flashcard = {};

    $scope.submitFc = function() {
    // Creating elements shortcut variable
    var termText = angular.element('#fc-term-text');
    var fcDefinitionImg = angular.element('#fc-definition-img');
    var fcDefinitionText = angular.element('#fc-definition-text');
    var fcCategoryImg = angular.element('#category-list-img').val();
    var fcCategoryText = angular.element('#category-list-text').val();

    var flashCardData = {};

    // Set the new flashcard Obj depending of its type, Image or Text
    if ($scope.ImgOrText) {
      flashCardData.term = termText.val();
      flashCardData.picture = null;
      flashCardData.definition = fcDefinitionText.val();
      flashCardData.categoryName = fcCategoryText;
      flashCardData.img = false;
      termText.required = true;
    } else {
      flashCardData.term = null;
      flashCardData.picture = $scope.flashcard.picture;
      flashCardData.definition = fcDefinitionImg.val();
      flashCardData.categoryName = fcCategoryImg;
      flashCardData.img = true;
      termText.required = false;
    }

    // Check if a new category was entered and save it to the DB
    if (flashCardData.img) {
      if ($('#category-list-img option:selected').data('new')) {
        var newCategory = {
          name: $('#category-list-img option:selected').val()
        };
        Categories.createCategory(newCategory);
      }
    } else {
      if ($('#category-list-text option:selected').data('new')) {
        var newCategoryBis = {
          name: $('#category-list-text option:selected').val()
        };
        Categories.createCategory(newCategoryBis);
      }
    }

    // Saving flashcard to the DB
    return $http({
      method: 'POST',
      url: '/flashcard/create',
      data: {
        flashCard: flashCardData
      }
    }).success(function successCallback(response) {
      // Clear all inputs values
      termText.val('');
      fcDefinitionImg.val('');
      fcDefinitionText.val('');
      angular.element('#file_input').val('');
      // Redirect to homepage
      $location.path('/homepage');
    }).error(function(response) {
      console.log('error creation')
    });
  };

  // Generate a random name with random characters
  var fileNameGenerator = function() {
    return Math.random().toString(36).substr(2, 15);
  }

  // Submit the picture to AWS
  $scope.submitPicture = function(){
    var fileName = fileNameGenerator();
    FlashCards.signRequest($scope.flashcardPicture, fileName);
    $scope.flashcard.picture = 'https://flashcards-app-flashcards.s3.amazonaws.com/pictures/' + fileName;
  };
  
  // Check picture size
  $scope.$watch('flashcardPicture', function(){
    if ($scope.flashcardPicture) {
      if($scope.flashcardPicture.size < 5242880){
        $scope.submitPicture();
      }
    }
  })

}])

// Check if a image file is entererd
.directive("fileread", [function () {
  return {
    scope: {
      fileread: "="
    },
    link: function (scope, element, attributes) {
      element.bind("change", function (changeEvent) {
        scope.$apply(function () {
          scope.fileread = changeEvent.target.files[0];
        });
      });
    }
  }
}]);