pinpoint.controller('categoryadController', function(
  $scope, 
  $location, 
  socket, 
  $http, 
  $stateParams,
  $state,
  authService,
  adsService) {

  'use strict';

  console.log('#### Category ad controller');

  if(authService.status()) {
    console.log('#### User Authenticated');
    console.log('#### Getting the ad info');
    setTimeout(function() {
      $scope.getAd();
    }, 200);
  } else {
    console.log('#### User not logged in');
    $state.go('login');    
  }

  $scope.getAd = function() {
    var id = $stateParams.id;
    var ad = adsService.getAd(id);
    ad.then(function(resolve) {
      console.log('#### Resolved');
      console.log(resolve);
      $scope.ad = resolve.data;
    }, function(reject) {
      console.log('#### Rejected');
      console.log(reject);
    });
  };

});
