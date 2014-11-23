pinpoint.controller('globalController', function(
  $scope,
  $localStorage,
  $state,
  $rootScope,
  authService,
  envService) {

  'use strict';

  console.log('#### Global Controller');
  $rootScope.environment = 'Production';
  $rootScope.apiUrl = 'https://desolate-meadow-6374.herokuapp.com';
  console.log('#### Environment set: ');
  console.log($rootScope);
});
