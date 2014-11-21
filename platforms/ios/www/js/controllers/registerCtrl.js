ionicmongo.controller('registerCtrl', function($scope, Friends, $http, socket, $rootScope) {
  console.log("This is the login controller");
 	console.log($rootScope.user);
  	$scope.auth = { username: "", password: ""}
	$http.get('http://localhost:3000/api/accounts').success(function(data) {
		console.log("api was called");
		console.log(data);
		$scope.accounts = data;
	})

	socket.emit("connect me", "hopefull connected");

	socket.on("user registered", function(data) {
		console.log(data);
		console.log("logged in successfully");
		$rootScope.user = {
			username: data.username
		}
		$state.go('tab.dash');		

	})

	socket.on("Testing", function(data) {
		console.log(data);
	})	


    $scope.register = function()  {
    	var email = $scope.auth.username;
		var password = $scope.auth.password;
		console.log(email, password);
		data = {
			username: email,
			password: password
		}
		socket.emit("register user", data);
    }

})