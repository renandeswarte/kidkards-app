angular.module('myApp.cookieServices', [])

.factory('Cookie', ['$cookies', function($cookies) {

  var parseCookie = function(cookie) {
    var json = cookie.substring(cookie.indexOf("{"), cookie.lastIndexOf("}") + 1);
    return angular.fromJson(json);
  };

  return {
    parseCookie: parseCookie
  };

}]);