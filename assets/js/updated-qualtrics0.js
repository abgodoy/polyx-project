var polyXApp = angular.module('polyXApp', []);



polyXApp.controller('PolyXController', function PolyXController($scope, $http) {

  var jsonFeed = 'assets/docs/updated-qualtrics.json';
  $http.get(jsonFeed).then(function(response){

    $scope.polyXList = response.data;
    console.log(response.data);
  });
});

// FILTERS

// curricular, co-curricular, both
polyxApp.filter("curr", function(){
  return function(input){
    var output = [];
    angular.forEach(input, function(value, key){
      if(value.[9] == 'curricular'){
        output.push(value);
      }
    });
    return output;
  }
});
