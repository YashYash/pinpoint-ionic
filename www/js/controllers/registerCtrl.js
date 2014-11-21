pinpoint.controller('registerCtrl', function(
  $scope,
  $rootScope,
  authService,
  $state,
  $localStorage) {

  'use strict';
  console.log('#### Register Controller');
  $scope.auth = {
    username: '',
    password: '',
    confirm: ''
  };
  $scope.register = function() {
    console.log($scope.auth);
    if ($scope.auth.username === '') {
      $scope.usernameEmpty = 'true'
    } else {
      var status = authService.register($scope.auth);
      status.then(function(resolve) {
        console.log('#### Resolved');
        console.log('#### User has been registered');
        console.log(resolve);
        $localStorage.user = resolve.data
        $localStorage.loggedIn = 'true';
        $state.go('tab.stream');
      }, function(reject) {
        console.log('#### Rejected');
        console.log(reject);
      })
    }
  };

  $scope.$watch('auth.username', function() {
    if ($scope.username !== '') {
      $scope.usernameEmpty = 'false';
    }
    var data = {
      username: $scope.auth.username
    }
    var check = authService.checkUsername(data);
    check.then(function(resolve) {
      if (resolve.data === 'Not Available') {
        $scope.usernameExists = 'true';
      }
      if (resolve.data === 'Username Available') {
        $scope.usernameExists = 'false';
      }
    })
  })
  $scope.$watch('auth.confirm', function() {
    if ($scope.auth.confirm === '') {
      $scope.passwordMatch = 'true';
    } else {
      if ($scope.auth.password === $scope.auth.confirm) {
        $scope.passwordMatch = 'true';
      } else {
        $scope.passwordMatch = 'false';
      }
    }
  })
});
