pinpoint.controller('categoriesController', function(
	$scope, 
	socket, 
	authService,
	categoriesService,
	$state) {

  'use strict';

  if(authService.status()) {
    console.log('#### User Authenticated');
  } else {
    console.log('#### User not logged in');
    $state.go('login');    
  }

  console.log('#### Categories Controller');
  
  var categories = categoriesService.getCategories();
  categories.then(function(resolve) {
  	console.log('#### Resolved');
  	console.log(resolve);
  	$scope.categories = resolve.data;
  }, function(reject) {
  	console.log('#### Rejected');
  	console.log(reject);
  });

  $scope.toAds = function(cat) {
    $state.go('tab.categories-ads', { id: cat._id});
  };
});
