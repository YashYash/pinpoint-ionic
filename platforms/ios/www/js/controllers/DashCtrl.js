ionicmongo.controller('DashCtrl', function($scope, $http, socket, $rootScope, $state) {
	console.log("working");
	$scope.socialtiles = [];
	$scope.pics = [];
	$scope.reddit = [];
	$scope.hold = '';
	$scope.testtap = function() {
		console.log("hold");
		$scope.hold = "being held!!";
	}

	$scope.release = function() {
		console.log("released");
		$scope.hold = "released";
	}
	$scope.tonews = function() {
		console.log("going to news");
		$state.go('tab.friends');
	}

	$scope.swiping = function() {
		console.log("swiping");
		$scope.hold = "swiping";
	}
	// Usamos el servicio q construimos	
	// instagram.getLocation(function(data){
	// 	$scope.pics = data;
	// 	console.log($scope.pics);
	// });
    $scope.showPosition = function (position) {
        $scope.lat = position.coords.latitude;
        $scope.lng = position.coords.longitude;
        $scope.accuracy = position.coords.accuracy;
        $scope.$apply();
        console.log("lat" + $scope.lat);
        console.log("lon" + $scope.lng);       
        $scope.$apply(function() {
	        var endPoint = "https://api.instagram.com/v1/media/search?lat=" + $scope.lat + "&lng=" + $scope.lng + "&access_token=375057478.a7c2376.33a303c68bb7444d8e6da85246259220&callback=JSON_CALLBACK";
	        $http({
	          method:'JSONP',
	          url:endPoint,
	          callback: "JSON_CALLBACK"
	        }).success(function(response) {
	          $scope.pics = response.data;

	        }) 
        });      
    };	

    $scope.getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
        }
        else {
            $scope.error = "Geolocation is not supported by this browser.";
        }
    };

    $scope.getLocation();    

	var redditurl = "http://api.reddit.com/hot?after=t3_&jsonp=JSON_CALLBACK";
	$http.jsonp(redditurl).success(function(reddits) {
		$scope.reddits = reddits.data.children;
		console.log($scope.reddits);
	})

	var youtubeurl = "http://gdata.youtube.com/feeds/api/standardfeeds/CA/most_popular?v=2&alt=json";
	$http.get(youtubeurl).success(function(youtubes) {
		$scope.youtubes = youtubes.feed.entry;
		console.log($scope.youtubes);
		for (var i = 0; i < $scope.youtubes.length; i++) {
			$scope.socialtiles.push($scope.youtubes[i]);
		}		
	})	


})