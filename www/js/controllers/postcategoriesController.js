pinpoint.controller('postcategoriesController', function(
	$scope, 
	$state, 
	$rootScope, 
	$localStorage, 
	authService, 
	categoriesService) {
  
  'use strict';
  console.log("#### Post Category Controller");

  if(authService.status()) {
    console.log('#### User Authenticated');
  } else {
    console.log('#### User not logged in');
    $state.go('login');
  }

  var categories = categoriesService.getCategories();
  categories.then(function(resolve) {
  	console.log('#### Resolved');
  	console.log(resolve);
  	$scope.categories = resolve.data;
  }, function(reject) {
  	console.log('#### Rejected');
  	console.log(reject);
  });

  $scope.toForm = function(cat) {
    $state.go('tab.post-form', { id: cat._id});
  };
});
