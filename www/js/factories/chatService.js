pinpoint.service('chatService', function(
  $state,
  $http,
  $rootScope,
  $localStorage) {

  'use strict';
  console.log('#### Chat Service');

  return {
    getChats: function() {
      var url = $rootScope.apiUrl + '/api/chat/user/' + $localStorage.user._id;
      return $http.get(url);
    },
    startChat: function(user) {
      var url = $rootScope.apiUrl + '/api/chat/start/' + $localStorage.user._id + '/' + user;
      return $http.get(url);
    },
    getMessages: function(id) {
      var url = $rootScope.apiUrl + '/api/chat/convo/' + $localStorage.user._id + '/' + id;
      return $http.get(url);
    },
    getSeller: function(id) {
      var url = $rootScope.apiUrl + '/api/chat/user/find/' + id;
      return $http.get(url);
    },
    sendMessage: function(message) {
      var url = $rootScope.apiUrl + '/api/chat/new/message';
      return $http.post(url, message);
    },
    typing: function(user, seller, what) {
      var data = {
        user: user._id,
        seller: seller._id,
        what: what
      }
      var url = $rootScope.apiUrl + '/api/chat/typing';
      return $http.post(url, data);
    }
  };
});
