pinpoint.controller('postidController', function(
  $scope, 
  $http, 
  $state, 
  $localStorage, 
  socket, 
  $stateParams,
  adsService,
  authService,
  $ionicModal) {
  
  'use strict';
  console.log('#### Post Id Controller');

  if(authService.status()) {
    console.log('#### User Authenticated');
  } else {
    console.log('#### User not logged in');
    $state.go('login');    
  }

  var id = $stateParams.id;
  var post = adsService.getAd(id);
  post.then(function(resolve) {
    console.log('#### Resolved');
    console.log(resolve);
    $scope.post = resolve.data;
  }, function(reject) {
    console.log('#### Reject');
    console.log(reject);
  });

  $ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
    $scope.modal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.openModal = function() {
    console.log('Opening Modal');
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.deleteAd = function() {
    var promise = adsService.deleteAd($scope.post);
    promise.then(function(resolve) {
      console.log('#### Resolved');
      console.log(resolve);
      $scope.modal.hide();
      $state.go('tab.post');
    }, function(reject) {
      console.log('#### Rejected');
      console.log(reject);
    });
  };
});