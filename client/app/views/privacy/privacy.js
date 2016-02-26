angular.module('myApp.privacyPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/privacy', {
    authenticate: false,
    templateUrl: 'views/privacy/privacy.html',
    controller: 'privacyCtrl'
  });
}])

.controller('privacyCtrl', ['$scope', 'Display', function($scope, Display) {
  // Center content to the middle of the page
  Display.centerElement('.page');
}]);