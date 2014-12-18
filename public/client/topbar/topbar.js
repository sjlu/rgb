rgb.directive('topbar', function($http) {
  return {
    templateUrl: 'topbar.html',
    link: function($scope, $el) {
      $http.get('/api/me').success(function(data) {
        $scope.user = data;
      }).error(function() {

      });

    }
  }
});