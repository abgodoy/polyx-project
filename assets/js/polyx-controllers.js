var myControllers = angular.module('myControllers', []);

myControllers.controller('SearchController',
  function MyController($scope, $http) {
    $http.get('assets/docs/details-with-all-fields.json').then(function(response) {
      $scope.artists = response.data;
      //$scope.artistOrder = 'name';
    })
  }
);

// var app = angular.module('polyXapp', []);
//
// app.controller('polyXcontroller', function MyController($scope, $http) {
//
//   $http.get('details-with-all-fields.json').then(function(response){
//     $scope.artists = response.data;
//   });
// });
