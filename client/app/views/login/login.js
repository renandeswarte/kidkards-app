angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    authenticate: false,
    templateUrl: 'views/login/login.html'
  });
}]);