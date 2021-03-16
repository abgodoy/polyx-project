// var myApp = angular.module('myApp', []);
//
// myApp.controller('MyController', function MyController($scope, $http) {
//
//   $http.get('details-with-all-fields.json').then(function(response){
//     $scope.artists = response.data;
//     $scope.artistOrder = 'last-name';
//     console.log(response.data);
//   });
// });



var polyXApp = angular.module('polyXApp', []);

polyXApp.controller('PolyXController', function PolyXController($scope, $http) {

  $http.get('assets/docs/details-with-all-fields.json').then(function(response){
    $scope.polyXList = response.data;
    console.log(response.data);
  });
});


// var myApp = angular.module('myApp', [
//   'ngRoute',
//   'myControllers'
// ]);
//
// myApp.config(['$routeProvider', function($routeProvider){
//   $routeProvider
//     .when('/',{
//       templateUrl: ''
//       controller: 'SearchController'
//     });
// }]);
