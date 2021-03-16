var polyXApp = angular.module('polyXApp', []);

polyXApp.controller('PolyXController', function PolyXController($scope, $http) {

  $http.get('assets/docs/qualtrics-infoReady.json').then(function(response){
    $scope.qualtricsData = response.data;
    console.log(response.data);
  });
});
