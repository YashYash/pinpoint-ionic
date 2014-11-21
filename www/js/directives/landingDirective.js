pinpoint.directive('landingDirective', function(
  $http) {

  'use strict';

  console.log('#### Landing Directive');

  var linkFn;
  linkFn = function(scope, element, attrs, $state) {
    scope.fadeinLogo = function() {
      $('#logo').fadeIn(800);
    };

    scope.fadeinSub = function() {
      $('#sub-heading').fadeIn(800);
    };
    scope.fadeinCircle = function() {
      $('#pin-circle').fadeIn(800);
      $('#pin-outercircle').fadeIn(800);
    };    
    scope.animateLine = function() {
      $('#vertical-line').animate({
        height:'120px'
      }, 2500);      
    };
    scope.lightenOverlay = function() {
      $('#landing-overlay').animate({
        opacity: 0.98
      }, 2500);      
    };  
    scope.fadeinCount = function() {
      $('#ad-count').fadeIn(800);
    };
    scope.fadeinAddress = function() {
      $('#address').fadeIn(800);
      setTimeout(function() {
        scope.goLogin();
      }, 2000);
    };    
    setTimeout(function() {
      scope.fadeinLogo();
    }, 1500);
    setTimeout(function() {
      scope.fadeinSub();
    }, 2500);
    setTimeout(function() {
      scope.fadeinCircle();
    }, 3500); 
    setTimeout(function() {
      scope.animateLine();
    }, 4500);
    setTimeout(function() {
      scope.lightenOverlay();
    }, 4700);    
    setTimeout(function() {
      scope.fadeinCount();
    }, 6500);
    setTimeout(function() {
      scope.fadeinAddress();
    }, 7200);               
  };
  return {
    restrict: 'E',
    link: linkFn
  };
});
