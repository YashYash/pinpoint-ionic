pinpoint.controller('wishlistController', function(
	$scope,
	$rootScope,
	$localStorage,
	authService,
	adsService,
	$state,
	socket,
	userService) {

	'use strict';
	console.log('#### Wishlist Controller');

	if(authService.status()) {
		console.log('#### User Authenticated');
		setTimeout(function() {
			$scope.getWishtlist();
		},200);
	} else {
		console.log('#### User not logged in');
		$state.go('login');    
	}

	$scope.getWishtlist = function() {
		var wishlist = userService.getWishlist();
		wishlist.then(function(resolve) {
			console.log('#### Resolved');
			console.log(resolve);
			$scope.wishlist = resolve.data;
		}, function(reject) {
			console.log('#### Rejected');
			console.log(reject);
		});
	};
  $scope.seeWish = function(wish) {
    console.log('#### loading the ad');
    $state.go('tab.wish', {id: wish._id});
  }
});