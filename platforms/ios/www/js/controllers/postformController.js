pinpoint.controller('postformController', function(
  $scope,
  $http,
  $rootScope,
  $localStorage,
  $stateParams,
  geoService,
  categoriesService,
  adsService,
  $state,
  authService) {

  'use strict';
  console.log('#### Post Form Controller');

  if (authService.status()) {
    console.log('#### User Authenticated');
  } else {
    console.log('#### User not logged in');
    $state.go('login');
  }

  $scope.ad = {
    title: '',
    price: '',
    address: '',
    seller: '',
    make: '',
    model: '',
    kilometers: '',
    miles: '',
    vehicletype: '',
    transmission: '',
    color: '',
    drive: '',
    fuel: '',
    description: '',
    petfriendly: '',
    furnished: '',
    bathrooms: '',
    rentby: '',
    size: '',
    tags: '',
    source: 'mobile user',
    geo: [],
    user: $localStorage.user._id,
    category: ''
  };

  var category = categoriesService.getCategory($stateParams.id);
  category.then(function(resolve) {
    console.log('#### Resolved');
    console.log(resolve);
    $scope.catName = resolve.data.name;
    $scope.ad.category = resolve.data._id;
  }, function(reject) {
    console.log('#### Rejected');
    console.log(reject);
  });

  if ($rootScope.location) {
    console.log('#### Already Obtained the location');
    var lat = $rootScope.location.lat;
    var lng = $rootScope.location.lng;
    $scope.ad.geo = [lng, lat];
    $scope.ad.address = $rootScope.location.address;
    console.log($scope.ad.address);
  } else {
    geoService.getLocation();
  }

  $rootScope.$on('got location', function() {
    var lat = $rootScope.location.lat;
    var lng = $rootScope.location.lng;
    $scope.ad.geo = [lng, lat];
    geoService.getAddress(lat, lng);
  });

  $rootScope.$on('got address', function() {
    console.log('#### Got the address');
    $scope.ad.address = $rootScope.location.address;
    console.log($scope.ad.address);
  });

  $scope.newAd = function() {
    console.log($scope.ad);
    var status = adsService.newAd($scope.ad);
    status.then(function(resolve) {
      console.log('#### Resolved');
      console.log(resolve);
      console.log('#### Ad has been added');
      $state.go('tab.post');
    }, function(reject) {
      console.log('#### Rejected');
      console.log(reject);
    });
  };
});
