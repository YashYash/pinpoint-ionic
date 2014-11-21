pinpoint.service('authService', function(
  $state,
  $http,
  $rootScope,
  $localStorage) {

  'use strict';
  console.log('#### Auth Service');

  return {
    register: function(user) {
      console.log('#### in auth service');
      console.log(user);
      var url = 'http://localhost:3000/auth/register';
      return $http.post(url, user);
    },
    login: function(user) {
      console.log('#### In the auth service');
      var url = 'http://localhost:3000/auth/login';
      return $http.post(url, user);
    },
    status: function() {
      console.log('#### Authenticating user');
      if ($localStorage.loggedIn === 'true') {
        console.log('logged in');
        return true;
      } else {
        console.log('#### User not logged in');
        return false;
      }
    },
    editAccount: function(account) {
      var url = 'http://localhost:3000/auth/edit';
      return $http.post(url, account);
    },
    changePassword: function(password) {
      var url = 'http://localhost:3000/auth/change-password';
      return $http.post(url, password);
    },
    checkUsername: function(username) {
      var url = 'http://localhost:3000/auth/check-username';
      return $http.post(url, username);
    },
    updateLocation: function(id, lng, lat) {
      var url = 'http://localhost:3000/auth/current-location';
      var data = {
        id: id,
        lng: lng,
        lat: lat
      };
      console.log('#### DATA IN AUTH SERVICE');
      console.log(data);
      return $http.post(url, data);
    }
  };
});
