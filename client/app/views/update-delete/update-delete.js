angular.module('myApp.updateDeleteCard', [])

.controller('updateDeleteController', ['$scope', '$route', 'Cookie', '$cookies', 'FlashCards', function($scope, $route, Cookie, $cookies, FlashCards) {

  $scope.user = null;
  // Check cookies for user connexion information
  var cookie = $cookies.get('flashcards-app-FC');

  if (cookie) {
    // Create user object for cookie information
    var cookieObj = Cookie.parseCookie(cookie);
    var user = {
      uid: cookieObj.uid,
      username: cookieObj.username,
      email: cookieObj.email,
      isAdmin: cookieObj.isAdmin,
      token: cookieObj.token
    }
    $scope.user = user;
  }

  $scope.showUpdateModal = function(id,elm) {
    angular.element('#update-modal').modal('show');

    $scope.definitionUpdate = elm.value.definition;
    angular.element('.card-id').val(id);
    angular.element('#fc-definition-update').val($scope.definitionUpdate);
  };

  $scope.showDeleteModal = function(id) {
    angular.element('#delete-modal').modal('show');
    angular.element('.card-id-delete').val(id);
  };

  $scope.updateForm = function() {
    var updatedCard = {
      id: angular.element('.card-id').val(),
      definition: angular.element('#fc-definition-update').val()
    }
    FlashCards.updateFlashcard(updatedCard).then(function(res) {
      angular.element('#update-modal').modal('hide');
      $route.reload();
    });
  };

  $scope.deleteForm = function() {
    var deletedCard = {
      id: angular.element('.card-id-delete').val(),
    }
    FlashCards.deleteFlashcard(deletedCard).then(function(res) {
      angular.element('#delete-modal').modal('hide');
      $route.reload();
    });
  };

}]);
