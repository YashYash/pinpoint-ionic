pinpoint.service('envService', function(
  $rootScope,
  $localStorage,
  $http,
  $state) {

  'use strict';

  console.log('#### Environment Service');
  return {
    environment: function() {
      console.log('#### Gettting the environment');
    }
  };
});
