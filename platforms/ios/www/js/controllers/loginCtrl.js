ionicmongo.controller('loginCtrl', function($scope, Friends, $http, $window, $state, $rootScope) {
  console.log("This is the login controller");
  	$scope.auth = { username: "", password: ""}
	$http.get('http://localhost:3000/api/accounts').success(function(data) {
		console.log("api was called");
		console.log(data);
		$scope.accounts = data;
	})  
    $scope.login = function()  {
    	var email = $scope.auth.username;
		var password = $scope.auth.password;
		console.log(email, password);
		$http.get('http://localhost:3000/api/ionic/accounts/' + email + '/' + password).success(function(data) {
			console.log("api was called");
			console.log(data);
			if(data) {
				if(data.username == email && data.password == password) {
					console.log("logged in successfully");
					$rootScope.user = {
						username: email
					}
					$state.go('tab.dash');
				} else {
					console.log("incorrect username or password");
				}
			} else {
				console.log("incorrect useranme or password");
			}
		}) 		
    }	
    $scope.showPosition = function (position) {
        $rootScope.location = {
        	longitude: position.coords.longitude,
        	latitude: position.coords.latitude,
        	accuracy: position.coords.accuracy
        }
        $scope.$apply();
        console.log("lat" + $scope.lat);
        console.log("lon" + $scope.lng);
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
})