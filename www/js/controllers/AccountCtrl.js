pinpoint.controller('AccountCtrl', function(
  $scope,
  $localStorage,
  $state,
  authService,
  $ionicModal) {

  'use strict';

  console.log('This is the account controller');
  console.log($localStorage);

  $scope.account = {
    username: $localStorage.user.username,
    email: $localStorage.user.email
  };
  $scope.password = {};

  $scope.logOut = function() {
    $localStorage.$reset();
    $state.go('login');
  };

  $ionicModal.fromTemplateUrl('email-username.html', function($ionicModal) {
    $scope.usernameModal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $ionicModal.fromTemplateUrl('password.html', function($ionicModal) {
    $scope.passwordModal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.openModal = function(type) {
    if (type === 'username') {
      $scope.usernameModal.show();
    }
    if (type === 'password') {
      $scope.passwordModal.show();
    }
  };

  $scope.closeModal = function(type) {
    if (type === 'username') {
      $scope.usernameModal.hide();
    }
    if (type === 'password') {
      $scope.passwordModal.hide();
    }
  };


  $scope.change = function(username, email) {
    var data = {
      id: $localStorage.user._id,
      username: username,
      email: email
    };
    var updateStatus = authService.editAccount(data);
    updateStatus.then(function(resolve) {
      console.log('#### Resolved');
      console.log(resolve);
      $localStorage.user.username = resolve.data.account.username;
      $localStorage.user.email = resolve.data.account.email;
      $scope.closeModal('username');
    }, function(reject) {
      console.log('#### Rejected');
      console.log(reject);
    });
  };

  $scope.editAccount = function() {
    console.log('#### Edditing the account');
    console.log($scope.account);
    if ($scope.account.username === $localStorage.user.username) {
      console.log('#### Username is the same');
      $scope.change($scope.account.username, $scope.account.email);
    } else {
      console.log('#### Usernames are not the same');
      var username = {
        username: $scope.account.username
      };
      var checkStatus = authService.checkUsername(username);
      checkStatus.then(function(resolve) {
        console.log('#### Resolved');
        console.log(resolve);
        if (resolve.data === 'Username Available') {
          console.log('#### Username does not exist. Changing it');
          $scope.change($scope.account.username, $scope.account.email);
        } else {
          console.log('#### Username is not availible');
        }
      }, function(reject) {
        console.log('#### Rejected');
        console.log(reject);
      });
    }
  };

  $scope.changePassword = function() {
    console.log('#### Editing the password');
    if ($scope.password.new === $scope.password.confirm) {
      var data = {
        id: $localStorage.user._id,
        currpassword: $scope.password.current,
        newpassword: $scope.password.new,
      };
      var updateStatus = authService.changePassword(data);
      updateStatus.then(function(resolve) {
        console.log('#### Resolved');
        console.log(resolve);
        $scope.closeModal('password');
      }, function(reject) {
        console.log('#### Rejected');
        console.log(reject);
      });
    } else {
      console.log('#### Passwords do not match');
    }
    console.log($scope.password);
  };
});
