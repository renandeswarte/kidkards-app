angular.module('myApp.categoriesServices', [])

.factory('Categories', ['$http', function($http) {

  var categories = {};

  var getCategoriesList = function() {
   return $http({
     method: 'GET',
     url: '/categories/getList'
   }).then(function(res) {
    for (var elm in res.data) {
      categories[res.data[elm].id] = res.data[elm].name;
    }
     return res.data;
   });
  };

  var createCategory = function(categoryData) {
    return $http({
      method: 'POST',
      url: '/categories/create',
      data: categoryData
    }).success(function successCallback(response) {
      //console.log("success", response);
    }).error(function(response) {
      console.log('error creation')
    });
  };

  var getCategories = function() {
   return categories;
  };

  return {
    getCategoriesList: getCategoriesList,
    getCategories: getCategories,
    createCategory: createCategory
  };

}]);