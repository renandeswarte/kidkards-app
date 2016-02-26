angular.module('myApp.informationsPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/informations', {
    authenticate: false,
    templateUrl: 'views/informations/informations.html',
    controller: 'informationCtrl'
  });
}])

.controller('informationCtrl', ['$scope', 'Display', function($scope, Display) {
  // Center content to the middle of the page
  Display.centerElement('.page');
}]);