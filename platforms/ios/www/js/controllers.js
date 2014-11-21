angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, socket) {
	console.log("working");
	$http.get('http://localhost:3000/api/accounts').success(function(data) {
		console.log("api was called");
		console.log(data);
		$scope.accounts = data;
	})
	socket.emit("connect me", "hopefull connected");

	$scope.testPost = function(data) {
		var data = data
		socket.emit("testing post", "testing post");
		$http.post('http://localhost:3000/api/test', {name: data }).success(function(response) {
			console.log("post was successfull");
			console.log(response);
		})
	}
    $scope.facebookLike = function (item) {
        $http.post('/api/v1/click_count/?format=json', {"facebook_count": "like", "video": item.resource_uri}).
            success(function (response) {
                console.log(response);
                $location.path("/");

            });
    };


	
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})

