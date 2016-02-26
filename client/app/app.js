// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.login',
  'myApp.homepage',
  'myApp.auth',
  'myApp.displayServices',
  'myApp.authServices',
  'myApp.categoriesServices',
  'myApp.cookieServices',
  'myApp.flashcardsServices',
  'myApp.header',
  'myApp.headerDirective',
  'myApp.modalDirective',
  'myApp.addFlashcardPage',
  'myApp.browseCategoriesPage',
  'myApp.browseFlashcardsPage',
  'myApp.quizzCategoriesPage',
  'myApp.quizzFlashcardsPage',
  'myApp.updateDeleteCard',
  'myApp.matchingCategoriesPage',
  'myApp.matchingFlashcardsPage',
  'myApp.informationsPage',
  'myApp.privacyPage'
  ])

// Default route redirection
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({
		redirectTo: '/'
	});
}])

.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window) {
  // Update analytics data
  $rootScope.$on('$routeChangeSuccess',function(event){
    if (!$window.ga) {
      return;
    }
    $window.ga('set', 'checkProtocolTask', null);
    $window.ga('send', 'screenview', {
      'appName': 'Kidkards',
      'appVersion': '1.0',
      'screenName': $location.path()
    });
  });
}]);
