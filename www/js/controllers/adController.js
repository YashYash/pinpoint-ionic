pinpoint.controller('adController', function(
  $scope, 
  $rootScope, 
  $location, 
  socket, 
  $http, 
  $stateParams, 
  $localStorage, 
  $state, 
  adsService,
  authService,
  chatService,
  userService) {

  'use strict';
  $scope.send = {};

  console.log('#### Ad Controller');
  $scope.ad;
  if(authService.status()) {
    console.log('#### User Authenticated');
  } else {
    console.log('#### User not logged in');
    $state.go('login');    
  }

  var ad = adsService.getAd($stateParams.id);
  ad.then(function(resolve) {
    console.log('#### Resolved');
    console.log(resolve);
    $scope.ad = resolve.data;
  }, function(reject) {
    console.log('#### Rejected');
    console.log(reject);
  });

  $scope.addtoWishlist = function(ad) {
    if($localStorage.user._id === ad.user) {
      console.log('#### Cannot add your own ad into your wishlist');
    } else {
      var postAdd = userService.addtoWishlist(ad);
      postAdd.then(function(resolve) {
        console.log('#### Resolved');
        console.log(resolve);
      }, function(reject) {
        console.log('#### Rejected');
        console.log(reject);
      });      
    }
  };

  $scope.startChat = function(user) {
    console.log(user);
    if(user === $localStorage.user._id) {
      console.log('#### Cannot start convo with yourself');
    } else {
      console.log('#### Starting convo');
      var initChat = chatService.startChat(user);
      initChat.then(function(resolve) {
        console.log('#### Resolved');
        console.log(resolve);
        console.log('#### Chat has been ititiated. Going to chat tab');
        $state.go('tab.chat');
      }, function(reject) {
        console.log('#### Rejected');
        console.log(reject);
      });
    }
  };

  $scope.sendMessage = function(url) {
    console.log(url);
    adsService.sendMessage(url);
  };
});
