pinpoint.directive('streamDirective', function(
  $http, 
  $localStorage, 
  $state) {

  'use strict';
  var linkFn;
  linkFn = function(scope, element, attrs) {
    console.log('#### Stream Directive');

  };
  return {
    restrict: 'E',
    link: linkFn
  };
});
