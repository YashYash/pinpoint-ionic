pinpoint.controller('adsController', function(
  $scope,
  $rootScope, 
  $location, 
  socket, 
  $stateParams,
  $state,
  authService,
  geoService,
  adsService) {

  'use strict';

  console.log('#### Ads Controller');
  $scope.stop = 'false';

  if(authService.status()) {
    console.log('#### User Authenticated');
    console.log('#### Checkig to see if location has been obtained');
    if($rootScope.location) {
      console.log('#### Already obtained location. Now getting the ads');
      var id = $stateParams.id;
      var lng = $rootScope.location.lng;
      var lat = $rootScope.location.lat;
      setTimeout(function() {
        $scope.getAds(id, lng, lat);
      },200);      
    } else {
      console.log('#### Location has not been obtained. Getting it now');
      geoService.getLocation();
    }
  } else {
    console.log('#### User not logged in');
    $state.go('login');    
  }

  $rootScope.$on('got location', function() {
    if($scope.stop === 'false') {
      $scope.stop = 'true';
      var id = $stateParams.id;
      var lng = $rootScope.location.lng;
      var lat = $rootScope.location.lat;
      $scope.getAds(id, lng, lat);
    }
  });

  $scope.getAds = function(id, lng, lat) {  
    console.log('#### In Get Ads function'); 
    var ads = adsService.getcatAds(id, lng, lat);
    ads.then(function(resolve) {
      console.log('#### Resolved');
      console.log(resolve);
      $scope.ads = resolve.data;
    }, function(reject) {
      console.log('#### Rejected');
      console.log(reject);
    });
  };

});
