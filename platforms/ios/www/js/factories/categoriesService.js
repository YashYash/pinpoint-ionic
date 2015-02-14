pinpoint.service('categoriesService', function(
  $state,
  $http,
  $rootScope,
  $localStorage) {

  'use strict';
  console.log('#### Category Service');

  return {
    getCategories: function() {
      var url = $rootScope.apiUrl + '/api/categories';
      return $http.get(url);
    },
    getCategory: function(id) {
      var url = $rootScope.apiUrl + '/api/categories/' + id;
      return $http.get(url);
    }
  };
});
