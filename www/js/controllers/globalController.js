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
  $rootScope.apiUrl = 'http://www.pinpoint.zone';
  console.log('#### Environment set: ');
  console.log($rootScope);
});
