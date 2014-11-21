pinpoint.controller('postController', function(
  $scope, 
  $rootScope, 
  $localStorage, 
  $state, 
  authService, 
  adsService) {
  
  'use strict';

  console.log('#### Post Controller');

  if(authService.status()) {
    console.log('#### User Authenticated');
  } else {
    console.log('#### User not logged in');
    $state.go('login');    
  }

  var ads  = adsService.getuserAds();
  ads.then(function(resolve) {
    console.log('#### Resolved');
    console.log(resolve);
    $scope.ads = resolve.data;
  }, function(reject) {
    console.log('#### Rejected');
    console.log(reject);
  });

  $scope.createAd = function() {
  	$state.go('tab.post-categories');
  };

});
