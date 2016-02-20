angular.module('myApp.homepage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    authenticate: true,
    templateUrl: 'views/home/home.html',
    controller: 'homepage'
  });
}])

.controller('homepage', ['$scope', '$http', 'Categories', 'FlashCards', function($scope, $http, Categories, FlashCards) {

  // Set default min height regarding screen height
  angular.element('.page').css('min-height', window.innerHeight - 40 + 'px');


}]);
