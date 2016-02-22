angular.module('myApp.authServices', [])

.factory('Auth', [ '$http', '$cookies', function($http, $cookies) {

  // Create User when signin up
  var loginUser = function(dataUser) {
    return $http({
      method: 'POST',
      url: apiURL + '/auth/user-login',
      data: {
        user: dataUser
      }
    }).success(function successCallback(response) {
      // console.log("success Login", response);
      return response;
    }).error(function(response) {
      console.log('error creation')
      return response;
    });
  };

  // Create User when signin up
  var createUser = function(dataUser) {
    return $http({
      method: 'POST',
      url: apiURL + '/auth/user-create',
      data: {
        user: dataUser
      }
    }).success(function successCallback(response) {
      return response;
    }).error(function(response) {
      console.log('error creation')
      return response;
    });
  };

  var logout = function() {
   return $http({
     method: 'GET',
     url: apiURL + '/auth/logout'
   }).then(function(res) {
     return res.data;
   });
  };

  // Check is user is authenticate
  var isAuth = function() {
   return !!$cookies.get('flashcards-app-FC');
  };

  return {
    loginUser: loginUser,
    createUser: createUser,
    logout: logout,
    isAuth: isAuth
  };

}]);