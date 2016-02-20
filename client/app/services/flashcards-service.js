angular.module('myApp.flashcardsServices', [])

.factory('FlashCards', ['$http', function($http) {

  var getLastestFlashcards = function() {
    return $http({
      method: 'GET',
      url: '/flashcard/getLastest'
    }).success(function successCallback(response) {
      return response.data;
    }).error(function(response) {
      console.log('error creation')
    });
  };

  var getFlashcardsByCategory = function(category) {
    return $http({
      method: 'GET',
      url: '/flashcard/' + category
    }).success(function successCallback(response) {
      return response.data;
    }).error(function(response) {
      console.log('error getting flashcards')
    });
  };

  var updateFlashcard = function(cardInfo) {
    return $http({
      method: 'PUT',
      url: '/flashcard/update-flashcard',
      data: {
        id: cardInfo.id,
        definition: cardInfo.definition
      }
    }).success(function successCallback(response) {
      //console.log('update success');
      return response;
    }).error(function(response) {
      console.log('error getting flashcards')
    });
  };

  var deleteFlashcard = function(cardInfo) {
    return $http({
      method: 'DELETE',
      url: '/flashcard/delete-flashcard/'+ cardInfo.id
    }).success(function successCallback(response) {
      //console.log('delete success');
      return response;
    }).error(function(response) {
      console.log('error deleting flashcards')
    });
  };

  // Array Shuffle method
  var shuffleFlashcards = function(array) {
    var i = 0;
    var j = 0;
    var temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  // AWS S3 CDN - Server Authentification
  var signRequest = function(file, fn){

      var xhr = new XMLHttpRequest();
      
      xhr.open("GET", "/api/sign_s3?file_name="+fn+"&file_type="+file.type);
      xhr.onreadystatechange = function(){
          if(xhr.readyState === 4){
              if(xhr.status === 200){
                  var response = JSON.parse(xhr.responseText);
                  upload_file(file, response.signed_request, response.url);
              }
              else{
                  alert("Could not get signed URL.");
              }
          }
      };
      xhr.send();
  };

  var upload_file = function(file, signed_request, url){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onerror = function() {
        alert("Oops it looks like your picture was not uploaded properly");
    };
    xhr.send(file);
  };

  return {
    getLastestFlashcards: getLastestFlashcards,
    getFlashcardsByCategory: getFlashcardsByCategory,
    shuffleFlashcards: shuffleFlashcards,
    updateFlashcard: updateFlashcard,
    deleteFlashcard: deleteFlashcard,
    signRequest: signRequest
  };

}]);