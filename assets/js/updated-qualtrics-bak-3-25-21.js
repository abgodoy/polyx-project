var app = angular.module('polyXApp', []);

// college division
app.filter("college_division", function(){
  return function(input, option){
    var output = [];

    var opt = "";
    if (option != null){
      opt = option;
    }

    angular.forEach(input, function(value, key){
      if( value.q7 == opt ){
        output.push(value);
      }
    });
    return output;
  }
});

// curricular vs. co-curricular
app.filter("curr", function(){
  return function(input, option){
    var output = [];

    var opt = "";

    if(option != undefined) {
      opt = option.toLowerCase();
    }

    angular.forEach(input, function(value, key){
      if(opt === value.q9.toLowerCase()){
        output.push(value);
      }

      //string lenght of more than 15 will only collect 'curricular and co-curricular' values
      if(opt.length > 13 && value.q9.toLowerCase().indexOf(opt) > 0){
        output.push(value);
      }

    });
    return output;
  }
});

// PolyX name
app.filter("polyx_name", function(){
  return function(input, option){
    var output = [];

    var opt = "";

    if(option != undefined) {
      opt = option.toLowerCase();
    }

    angular.forEach(input, function(value, key){
      if(opt === value.q1.toLowerCase()){
        output.push(value);
      }

    });
    return output;
  }
});

// Get unique College/Division values
// app.filter("unique_division", function(){
//   return(input){
//     var output = [];
//     angular.forEach(input, function(value, key){
//       // CODE HOW TO GRAB UNIQUE VLAUES HERE!!
//     });
//     return output;
//   }
// });

// Class standing

app.filter("class", function(){
  return function(input, option){

    var output = [];
    var opt = "";

    if(option != undefined) {
      opt = option.toLowerCase();
    }

    angular.forEach(input, function(value, key){

      if( value.q12.toLowerCase().indexOf(opt) > 0 ){
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
