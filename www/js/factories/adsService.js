pinpoint.service('adsService', function(
	$state, 
	$http, 
	$rootScope, 
	$localStorage) {

	'use strict';
	
	console.log('#### Ads Service ');

	return {
		getAd: function(id) {
			var url = 'http://localhost:3000/api/ads/' + id;
			return $http.get(url);
		},
		getAds: function(lat, lng) {
			console.log('ready to get ads');
			var url = 'http://localhost:3000/api/ads/location/' + lng + '/' + lat;
			return $http.get(url);
		},
		getuserAds: function() {
			var url = 'http://localhost:3000/api/ads/all/user/' + $localStorage.user._id;
			return $http.get(url);
		},
		getcatAds: function(id, lng, lat) {
			var url = 'http://localhost:3000/api/ads/category/location/' + id + '/' + lng + '/' + lat;
			return $http.get(url);
		},
		newAd: function(ad) {
			var url = 'http://localhost:3000/api/ads/new';
			return $http.post(url, ad);
		},
		deleteAd: function(ad) {
			var url = 'http://localhost:3000/api/ads/delete';
			return $http.post(url, ad);
		},
		sendMessage: function(url) {
			var posturl = 'http://localhost:3000/api/kijiji-post';
			var info = {
				url: url
			};
			console.log(info);
			$http.post(posturl, info);
		}
	};
});