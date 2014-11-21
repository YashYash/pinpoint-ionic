pinpoint.controller('chatController', function(
	$scope, 
	$http, 
	$state, 
	$localStorage, 
	socket,
	authService,
	chatService) {

	'use strict';
	console.log('#### Chat Controller');

	if(authService.status()) {
		console.log('#### User Authenticated');
		$scope.userid = $localStorage.user._id;
	} else {
		console.log('#### User not logged in');
		$state.go('login');    
	}

	$scope.getChats = function() {
		var chats = chatService.getChats();
	    chats.then(function(resolve) {
	      console.log('#### Resolved');
	      console.log(resolve);
	      $scope.chats = resolve.data;
	    }, function(reject) {
	      console.log('#### Rejected');
	      console.log(reject);
	    });
	};

	$scope.getChats();

	socket.on('chats update', function() {
		console.log('#### Getting new chat');
		$scope.getChats();
	});
});