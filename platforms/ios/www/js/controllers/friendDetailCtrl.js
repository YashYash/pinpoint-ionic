ionicmongo.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
  console.log("This is the detail controller");
})
