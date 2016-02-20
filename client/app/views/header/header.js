angular.module('myApp.header', [])

.controller('headerController', 
  ['$scope', '$log', '$location', '$window',
  function($scope, $log, $location, $window) {

  $scope.showLoginModal = function() {
    angular.element('#login-modal').modal('show');
  }

  $scope.logout = function() {
    $window.location.href='/auth/logout'
  }

}]);
