pinpoint.controller('chatroomController', function(
  $scope,
  $http,
  $state,
  $localStorage,
  socket,
  $stateParams,
  $ionicScrollDelegate,
  chatService) {

  'use strict';

  console.log('#### Chat Room Controller');

  $scope.username = $localStorage.user.username;
  $scope.seller;
  $scope.send = {
    message: ''
  };

  $scope.getMessages = function() {
    var messages = chatService.getMessages($stateParams.idone);
    messages.then(function(resolve) {
      console.log('#### Resolved');
      console.log(resolve);
      $scope.messages = resolve.data;
      $ionicScrollDelegate.$getByHandle('contentScroll').scrollBottom(true);
    }, function(reject) {
      console.log('#### Rejected');
      console.log(reject);
    });
  };

  $scope.getSeller = function() {
    var seller = chatService.getSeller($stateParams.idone);
    seller.then(function(resolve) {
      console.log('#### Resolved');
      console.log(resolve);
      $scope.seller = resolve.data;
      var unique = 'message ' + $scope.seller._id + $localStorage.user._id;
      console.log('#### Unique socket on message');
      console.log(unique);
      $scope.uniqueSet(unique);
    }, function(reject) {
      console.log('#### Rejected');
      console.log(reject);
    });
  };

  $scope.sendMessage = function() {
    if ($scope.send.message.length > 0 || $scope.send.message !== '') {
      var data = {
        username: $localStorage.user.username,
        message: $scope.send.message,
        userid: $localStorage.user._id,
        seller: $stateParams.idone
      };
      var message = chatService.sendMessage(data);
      message.then(function(resolve) {
        console.log('#### Resolved');
        console.log(resolve);
        $scope.send.message = '';
        $scope.getMessages();
      }, function(reject) {
        console.log('#### Rejected');
        console.log(reject);
      });
    } else {
      console.log('#### No message to send');
    }
  };


  $scope.getMessages();
  $scope.getSeller();

  $scope.$watch('send.message', function() {
    if ($scope.send.message !== '') {
      console.log('#### Sender is typing');
      var typing = chatService.typing($localStorage.user, $scope.seller, 'show');
      typing.then(function(resolve) {
        console.log('#### Resolved');
        console.log(resolve);
      }, function(reject) {
        console.log('#### Rejected');
        console.log(reject);
      });
    } else {
      var typing = chatService.typing($localStorage.user, $scope.seller, 'hide');
      typing.then(function(resolve) {
        console.log('#### Resolved');
        console.log(resolve);
      }, function(reject) {
        console.log('#### Rejected');
        console.log(reject);
      });
    }
  });

  $scope.uniqueSet = function(unique) {
    socket.on(unique, function(data) {
      console.log('typing...');
      if (data === 'show') {
        $scope.typing = 'true';
        $scope.$apply();
      }
      if (data === 'hide') {
        $scope.typing = 'hide';
        $scope.$apply();
      }
    });
  }
  socket.on('update messages', function(data) {
    $scope.getMessages();
    $ionicScrollDelegate.$getByHandle('contentScroll').scrollBottom();
  });
});
