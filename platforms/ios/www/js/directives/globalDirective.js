pinpoint.directive('globalDirective', function(
  $http, 
  $localStorage, 
  $state) {

  'use strict';
  var linkFn;
  linkFn = function(scope, element, attrs) {
    console.log('#### Global Directive');

  };
  return {
    restrict: 'E',
    link: linkFn
  };
});
