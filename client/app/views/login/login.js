angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    authenticate: false,
    templateUrl: 'views/login/login.html',
    controller: 'loginCrtl'
  });
}])

.controller('loginCrtl', ['Display', function(Display) {
  // Center content to the middle of the page
  Display.centerElement('.page');
}]);