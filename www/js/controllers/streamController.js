pinpoint.controller('streamController', function(
  $scope, 
  $rootScope, 
  socket, 
  $localStorage, 
  $state, 
  authService, 
  geoService, 
  adsService) {

  'use strict';

  $scope.adstop = 'false';
  $scope.addstop = 'false';
  $scope.locstop = 'false';

  $scope.updateLocation = function(user, lng, lat) {
    console.log('#### Updating the user\'s current location');
    var update = authService.updateLocation(user, lng, lat);
    update.then(function(resolve) {
      console.log('#### Resolved');
      console.log(resolve);
    }, function(reject) {
      console.log('#### Rejected');
      console.log(reject);
    });
  };

  if(authService.status()) {
    console.log('#### User Authenticated');
    if($rootScope.location) {
      console.log('#### Already obtained the location. Getting streams now');
      $scope.address = $rootScope.location.address;
      var lat = $rootScope.location.lat;
      var lng = $rootScope.location.lng;
      var status = adsService.getAds(lat,lng);
      status.then(function(resolve) {
        console.log('#### Resolved');
        console.log(resolve);
        console.log(resolve);
        $scope.hideAds = 'false';
        console.log('#### Got the ads');
        $rootScope.streamAds = resolve.data;
        $scope.ads = resolve.data;
        console.log($rootScope);        
      }, function(reject) {
        console.log('#### Rejected');
        console.log(reject);
      });
    } else {
      console.log('#### No location currently. Getting location');
      geoService.getLocation();

    }
  } else {
    console.log('#### User not logged in');
    $state.go('login');
  }

  $rootScope.$on('got location', function() {
    if($scope.locstop === 'false') {
      $scope.locstop = 'true';
      console.log('#### Got the location');
      console.log($rootScope);
      var lat = $rootScope.location.lat;
      var lng = $rootScope.location.lng;
      var user = $localStorage.user._id;
      geoService.getAddress(lat, lng);
      $scope.updateLocation(user, lng, lat);
      var ads = adsService.getAds(lat,lng);
      ads.then(function(resolve) {
        console.log('#### Resolved');
        console.log(resolve);
        $scope.hideAds = 'false';
        console.log('#### Got the ads');
        $rootScope.streamAds = resolve.data;
        $scope.ads = resolve.data;
        console.log($rootScope);
      }, function(reject) {
        console.log('#### Rejected');
        console.log(reject);
      });
    } else {
      console.log('#### Already got the broadcast: Location');
    }
  });

  $rootScope.$on('got address', function() {
    if($scope.addstop === 'false') {
      $scope.addstop = 'true';
      console.log('#### Got the address.');
      $scope.address = $rootScope.location.address;
      console.log($scope.address);      
    } else {
      console.log('#### Already got the broadcast: Address');
    }
  });

  $rootScope.$on('got ads', function() {
    $scope.hideAds = 'false';
    if($scope.adstop === 'false') {
      $scope.adstop = 'true';
      console.log('#### Got the ads');
      $scope.ads = $rootScope.streamAds;
    }
  });

  socket.on('new ad', function(data) {
    console.log('new ad has been added');
    adsService.getAds($rootScope.location.lat, $rootScope.location.lng);
  });

  $scope.refreshStream = function() {
    $scope.hideAds = 'true';
    $scope.adstop = 'false';
    $scope.addstop = 'false';
    $scope.locstop = 'false';    
    $scope.address = '';
    var lat = $rootScope.location.lat;
    var lng = $rootScope.location.lng;
    var user = $localStorage.user._id;
    $scope.updateLocation(user, lng, lat);    
    console.log('#### Refreshing Stream. Getting the location');
    geoService.getLocation();
  };

  $scope.goToAd = function(id) {
    $state.go('tab.stream-ad', {id: id});
  }
});
