angular.module('myApp.displayServices', [])

.factory('Display', function() {

  // Center element to the middle of the page
  var centerElement = function(elementClass, loader) {
    // Get Window Height
    var windowHeight = window.innerHeight;
    // Get element Height
    var contentHeight = angular.element(elementClass).height();
    
    if (contentHeight < windowHeight) {
      if (!loader) {
        var marginCalculated = (windowHeight - contentHeight) / 2;
        if ( marginCalculated <= 70) {
          angular.element(elementClass).css('margin-top', '70px');
        } else {
          angular.element(elementClass).css('margin-top', marginCalculated + 'px');
        }
      } else {
        angular.element(elementClass).css('margin-top', ((windowHeight - contentHeight) / 2) - 50 + 'px');
      }
    } else {
      angular.element(elementClass).css('margin-top', '70px');
    }
  };

  return {
    centerElement: centerElement
  };

});