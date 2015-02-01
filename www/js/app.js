'use strict';
var pinpoint = angular.module('pinpoint', ['ionic', 'ngSanitize', 'angular-gestures', 'ngStorage']);


pinpoint.factory('socket', function($http) {
  var socket = io.connect('https://desolate-meadow-6374.herokuapp.com:46030');
  // var socket = io.connect('http://localhost:3000');
  return socket;
});

pinpoint.run(function($ionicPlatform, $rootScope) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});



pinpoint.config(function(
  $stateProvider,
  $urlRouterProvider,
  $httpProvider,
  $compileProvider,
  $sceDelegateProvider) {

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|http|chrome-extension):/);
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https|http|ftp|i|file|blob|cdvfile):|data:image\//);
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    '*://www.youtube.com/**',
    '*://http://i.ebayimg.com/**'
  ]);

  $stateProvider

  // Auth
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'registerCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

  // Landing
  .state('landing', {
    url: '/',
    templateUrl: 'templates/landing.html',
    controller: 'landingCtrl'
  })

  // Tabs Main
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
  })

  // Stream
  .state('tab.stream', {
      url: '/stream',
      views: {
        'stream': {
          templateUrl: 'templates/stream.html',
          controller: 'streamController'
        }
      }
    })
    .state('tab.stream-ad', {
      url: '/stream/:id',
      views: {
        'stream': {
          templateUrl: 'templates/ad.html',
          controller: 'adController'
        }
      }
    })

  // Cateogries
  .state('tab.categories', {
      url: '/categories',
      views: {
        'categories': {
          templateUrl: 'templates/categories.html',
          controller: 'categoriesController'
        }
      }
    })
    .state('tab.categories-ads', {
      url: '/categories/:id',
      views: {
        'categories': {
          templateUrl: 'templates/ads.html',
          controller: 'adsController'
        }
      }
    })
    .state('tab.categories-ads-ad', {
      url: '/categories/ad/:id',
      views: {
        'categories': {
          templateUrl: 'templates/category-ad.html',
          controller: 'categoryadController'
        }
      }
    })

  // Post
  .state('tab.post', {
      url: '/post',
      views: {
        'tab-post': {
          templateUrl: 'templates/post.html',
          controller: 'postController'
        }
      }
    })
    .state('tab.post-id', {
      url: '/post/:id',
      views: {
        'tab-post': {
          templateUrl: 'templates/postid.html',
          controller: 'postidController'
        }
      }
    })
    .state('tab.post-categories', {
      url: '/post/all/categories',
      views: {
        'tab-post': {
          templateUrl: 'templates/post-categories.html',
          controller: 'postcategoriesController'
        }
      }
    })
    .state('tab.post-form', {
      url: '/post/form/:id',
      views: {
        'tab-post': {
          templateUrl: 'templates/post-form.html',
          controller: 'postformController'
        }
      }
    })

  // Chat
  .state('tab.chat', {
      url: '/chat',
      views: {
        'tab-chat': {
          templateUrl: 'templates/chat.html',
          controller: 'chatController'
        }
      }
    })
    .state('tab.chat-room', {
      url: '/chat/room/:idone/:idtwo',
      views: {
        'tab-chat': {
          templateUrl: 'templates/chat-room.html',
          controller: 'chatroomController'
        }
      }
    })

  // Wishlist
  .state('tab.wishlist', {
    url: '/wishlist',
    views: {
      'wishlist': {
        templateUrl: 'templates/wishlist.html',
        controller: 'wishlistController'
      }
    }
  })

  .state('tab.wish', {
    url:'/wishlist/:id',
    views: {
      'wishlist': {
        templateUrl: 'templates/wish.html',
        controller: 'wishController'
      }
    }
  })

  // Account
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // Write you 404 here
  $urlRouterProvider.otherwise('/');
});
