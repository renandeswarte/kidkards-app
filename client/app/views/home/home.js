angular.module('myApp.homepage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    authenticate: true,
    templateUrl: 'views/home/home.html',
    controller: 'homepage'
  });
}])

.controller('homepage', ['Display', function(Display) {

  // Center content to the middle of the page
  Display.centerElement('.page');

}]);
