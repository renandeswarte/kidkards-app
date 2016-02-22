angular.module('myApp.auth', [])

.controller('AuthController', ['$scope', '$route', '$http', 'Auth', '$cookies','$location', 'Cookie', '$window', '$rootScope', function($scope, $route, $http, Auth, $cookies, $location, Cookie, $window, $rootScope) {

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

  $rootScope.$on('unAuth', function(status) {
    $scope.user = null;
  });


  $scope.login = function() {
    // Create the user object with information from the login form
    var userLoginInfo = {
      userEmail : angular.element('#login-email').val(),
      userPwd : angular.element('#login-password').val()
    }

    // Call the login Method with the user informations
    Auth.loginUser(userLoginInfo)
    .then(function(res) {
      //Redirect User after login
      console.log(res.data)
      $cookies.put('flashcards-app-FC', JSON.stringify(res.data));
      $window.location.href='/';
    })
    .catch(function(err) {
      console.log("error",err);
      $scope.error = {
        message: err.data.code
      };
    });
  };

  $scope.logout = function() {
    // Logout the client, destroy the cookie and redirection to the default page
    // Auth.logout();
    $cookies.remove('flashcards-app-FC');
    $window.location.href='/';
  };

  $scope.createUser = function() {
    // Create the user object with information from the signup form
    var userCreateInfo = {
      userName : angular.element('#signup-firstname').val(),
      userEmail : angular.element('#signup-email').val(),
      userPwd : angular.element('#signup-password').val()
    }

    // Call the User creation Method with the user informations
    Auth.createUser(userCreateInfo)
    .then(function(res) {
      // Redirect user after login
      $window.location.href='/';
    })
    .catch(function(err) {
      console.log("error",err);
      $scope.error = {
        message: err.data.code
      };
    });
  };

}]);