// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.login',
  'myApp.homepage',
  'myApp.auth',
  'myApp.authServices',
  'myApp.categoriesServices',
  'myApp.cookieServices',
  'myApp.flashcardsServices',
  'myApp.header',
  'myApp.headerDirective',
  'myApp.footer',
  'myApp.footerDirective',
  'myApp.modalDirective',
  'myApp.addFlashcardPage',
  'myApp.browseCategoriesPage',
  'myApp.browseFlashcardsPage',
  'myApp.flashcardDirective',
  'myApp.quizzCategoriesPage',
  'myApp.quizzFlashcardsPage',
  'myApp.updateDeleteCard',
  'myApp.matchingCategoriesPage',
  'myApp.matchingFlashcardsPage'
  ])

// Default route redirection
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({
		redirectTo: '/'
	});
}])

// // Check if user is authenticate to access application views
// .run(['$rootScope', '$location', 'Auth', '$window', '$route', function($rootScope, $location, Auth, $window, $route) {
//   $rootScope.$on("$routeChangeStart", function(event, next, curr) {
//     if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
//       console.log('Please login before visiting ' + next.$$route.originalPath);
//       $location.path('/welcome');
//       // Signal to the Auth controller that the user unauth
//       $rootScope.$emit('unAuth', true);
//     }
//   });
// }]);
