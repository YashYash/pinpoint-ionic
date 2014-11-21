pinpoint.controller('loginCtrl', function(
	$scope, 
	authService,
  $state,
  $localStorage) {
  'use strict';
  console.log('#### Login Controller');
  $scope.auth = {
    username: '',
    password: ''
  };
  $scope.login = function() {
    var status = authService.login($scope.auth);
    status.then(function(resolve) {
      console.log('#### Resolved');
      console.log(resolve);
      if(resolve.data.message === 'Incorrect Username') {
        console.log('#### Incorrect Username');
        $scope.wrongUsername = 'true';
      }
      if(resolve.data.message === 'Incorrect Password') {
        console.log('#### Incorrect Password');
        $scope.wrongPassword = 'true';
      }      
      if(resolve.data.message === 'Authenticated') {
        console.log('#### User Authenticated');
        $localStorage.user = resolve.data.user;
        $localStorage.loggedIn = 'true';
        setTimeout(function() {
          $state.go('tab.stream');
        }, 1000);
      }
    }, function(reject) {
      console.log('#### Rejected');
      console.log(reject);
    });
  };

  $scope.$watch('auth.username', function() {
    $scope.wrongUsername = 'false';
    $scope.wrongPassword = 'false';
  });
  $scope.$watch('auth.password', function() {
    $scope.wrongUsername = 'false';
    $scope.wrongPassword = 'false';
  });  
});
