pinpoint.directive('adDirective', function(
  $http, 
  $localStorage, 
  $state) {

  'use strict';
  var linkFn;
  linkFn = function(scope, element, attrs) {
    console.log('#### Ad Directive');
    scope.loadIframe = function() {
      $('#target-div').load('http://www.kijiji.ca/v-dogs-puppies/thunder-bay/ckc-registered-german-shepherd-pups/1030659382 #R2SBox');
    };
  };
  return {
    restrict: 'E',
    link: linkFn
  };
});
