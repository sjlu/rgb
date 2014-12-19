rgb.controller('overview', function($scope, $http, DataManager) {

  DataManager.observe('myStatus', function(data) {
    $scope.status = data;
  });

  DataManager.observe('me', function(data) {
    $scope.user = data;
  });

});