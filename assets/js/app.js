var myApp = angular.module('myApp', []);

myApp.controller('MyController', function MyController($scope, $http) {

  $http.get('./assets/docs/details-with-all-fields.json').then(function(response){
    $scope.artists = response.data;
    $scope.artistOrder = 'last-name';
    console.log(response.data);
  });
});
