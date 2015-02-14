pinpoint.service('userService', function(
  $rootScope,
  $localStorage,
  $http,
  $state) {

  'use strict';

  console.log('#### User Service');
  return {
    getWishlist: function() {
      var url = $rootScope.apiUrl + '/api/user/wishlist/' + $localStorage.user._id;
      return $http.get(url);
    },
    addtoWishlist: function(ad) {
      var data = {
        id: $localStorage.user._id,
        ad: ad
      };
      var url = $rootScope.apiUrl + '/api/user/wishlist/add';
      return $http.post(url, data);
    }
  };
});
