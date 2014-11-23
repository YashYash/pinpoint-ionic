pinpoint.controller('globalController', function(
  $scope,
  $localStorage,
  $state,
  $rootScope,
  authService,
  envService) {

  'use strict';

  console.log('#### Global Controller');

  // $rootScope.environment = 'Development';
  // $rootScope.apiUrl = 'localhost:5000';
  // $rootScope.geoApi = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=';
  // console.log('#### Environment set: ');

  $rootScope.environment = 'Production';
  $rootScope.apiUrl = 'https://desolate-meadow-6374.herokuapp.com';
  $rootScope.geoApi = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
  console.log('#### Environment set: ');

  console.log($rootScope);
});
