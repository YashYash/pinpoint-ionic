ionicmongo.controller('FriendsCtrl', function($scope, Friends, $http, $rootScope) {
  $scope.friends = Friends.all();
  console.log("This is the friends controller");
	var nytsportsurl = "http://localhost:3000/api/scrape/newyorktimes/sports";
	$http.get(nytsportsurl).success(function(sports) {
		$scope.nytsports = sports;
		console.log($scope.nytsports);
	})
	var url = "http://api.nytimes.com/svc/mostpopular/v2/mostshared/all-sections/30.json?api-key=ef0432c510c86f0d12c781403c419ebb:0:69776355&callback=JSON_CALLBACK";	
    $http({
      method:'JSONP',
      url:url,
      callback: "JSON_CALLBACK"
    }).success(function(response) {
      $scope.nyt = response;
      console.log($scope.nyt);
    }) 	  
});

