pinpoint.directive('chatroomDirective', function($http) {

  'use strict';
  var linkFn;
  linkFn = function(scope, element, attrs, $state) {
    console.log('here');
    console.log($(document).height());
  };
  return {
    restrict: 'E',
    link: linkFn
  };
});
