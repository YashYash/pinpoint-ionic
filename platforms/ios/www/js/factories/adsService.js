pinpoint.service('adsService', function(
  $state,
  $http,
  $rootScope,
  $localStorage) {

  'use strict';

  console.log('#### Ads Service ');

  return {
    getAd: function(id) {
      var url = $rootScope.apiUrl + '/api/ads/' + id;
      return $http.get(url);
    },
    getAds: function(lat, lng) {
      console.log('ready to get ads');
      var url = $rootScope.apiUrl + '/api/ads/location/' + lng + '/' + lat;
      return $http.get(url);
    },
    getuserAds: function() {
      var url = $rootScope.apiUrl + '/api/ads/all/user/' + $localStorage.user._id;
      return $http.get(url);
    },
    getcatAds: function(id, lng, lat) {
      var url = $rootScope.apiUrl + '/api/ads/category/location/' + id + '/' + lng + '/' + lat;
      return $http.get(url);
    },
    newAd: function(ad) {
      var url = $rootScope.apiUrl + '/api/ads/new';
      return $http.post(url, ad);
    },
    deleteAd: function(ad) {
      var url = $rootScope.apiUrl + '/api/ads/delete';
      return $http.post(url, ad);
    },
    sendMessage: function(url) {
      var posturl = $rootScope.apiUrl + '/api/kijiji-post';
      var info = {
        url: url
      };
      console.log(info);
      $http.post(posturl, info);
    }
  };
});
