var app = angular.module('polyXApp', []);

// curricular vs. co-curricular
app.filter("curr", function(){
  return function(input){
    var output = [];
    angular.forEach(input, function(value, key){
      if(value.nine == "Curricular"){
        output.push(value);
      }
    });
    return output;
  }
});

// college division
app.filter("college_division", function(){
  return function(input){
    var output = [];
    angular.forEach(input, function(value, key){
      if(value.nine == "Curricular"){
        output.push(value);
      }
    });
    return output;
  }
});



app.controller('PolyXController', function PolyXController($scope, $http) {

  var jsonFeed = 'assets/docs/updated-qualtrics.json';
  $http.get(jsonFeed).then(function(response){

    $scope.polyXList = response.data;
    console.log(response.data);
  });
});
