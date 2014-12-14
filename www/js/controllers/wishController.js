pinpoint.controller('wishController', function(
  $scope, 
  $http, 
  $state, 
  $localStorage, 
  socket, 
  $stateParams,
  adsService,
  authService) {
  
  'use strict';
  console.log('#### Wish Controller');

  if(authService.status()) {
    console.log('#### User Authenticated');
  } else {
    console.log('#### User not logged in');
    $state.go('login');    
  }

  var id = $stateParams.id;
  var ad = adsService.getAd(id);
  ad.then(function(resolve) {
    console.log('#### Resolved');
    console.log(resolve);
    $scope.ad = resolve.data;
  }, function(reject) {
    console.log('#### Reject');
    console.log(reject);
  });
});