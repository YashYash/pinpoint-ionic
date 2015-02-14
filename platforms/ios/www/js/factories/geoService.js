pinpoint.service('geoService', function(
  $state,
  $http,
  $rootScope) {

  'use strict';

  console.log('#### Geo Service');

  return {
    getLocation: function() {
      console.log('#### Getting the location');
      var showPosition = function(position) {
        console.log(position);
        var location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        $rootScope.location = location;
        $rootScope.$broadcast('got location', null);
      };

      var showError = function(err) {
        console.log('there was an error getting the location');
        console.log('err: ' + err);
      };
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    },
    getAddress: function(lat, lng) {
      console.log('#### Getting the address');
      var url = $rootScope.geoApi + lat + ',' + lng + '&sensor=false';
      $http.get(url).success(function(address) {
        console.log('#### Got the addresses array');
        $rootScope.location.address = address.results[0].formatted_address;
        console.log($rootScope);
        $rootScope.$broadcast('got address', null);
      }).error(function(err, config, headers) {
        console.log('#### There was an error getting the address');
        console.log('err: ' + err);
        console.log('config: ' + config);
        console.log('headers: ' + headers);
      });

    }
  };
});
