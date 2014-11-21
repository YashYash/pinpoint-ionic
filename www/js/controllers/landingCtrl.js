pinpoint.controller('landingCtrl', function(
  $scope,
  $http, 
  $window, 
  $state, 
  $rootScope, 
  $localStorage,
  geoService,
  authService) {

  'use strict';
  console.log('#### Landing Controller');
  $scope.goLogin = function() {
    if(authService.status()) {
      console.log('#### User Authenticated');
      $state.go('tab.stream');
    } else {
      console.log('#### No user logged in');
      $state.go('login');
    }
  };
  
  geoService.getLocation();
  $rootScope.$on('got location', function() {
    console.log('#### Got the location');
    console.log($rootScope);
    var lat = $rootScope.location.lat;
    var lng = $rootScope.location.lng;
    geoService.getAddress(lat, lng);
  });
  $rootScope.$on('got address', function() {
    console.log('#### Got the address.');
    $scope.address = $rootScope.location.address;
    console.log($scope.address);
  });  

});
