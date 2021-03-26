var app = angular.module('polyXApp', []);

// college division
app.filter("college_division", function(){
  return function(input, option){
    var output = [];

    var opt = "";


    if (option != null){
      opt = option;
      if (opt == 'all') {
        angular.forEach(input, function(value, key){
            output.push(value);
        });
        console.log('option: ' +opt);
        console.log(output);
      } else {
        angular.forEach(input, function(value, key){
          if( value.q7 == opt ){
            output.push(value);
          }
        });
      }
    } else {
      output = input;
    }
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

      angular.forEach(input, function(value, key){
        if(opt === value.q9.toLowerCase()){
          output.push(value);
        }

        //string lenght of more than 15 will only collect 'curricular and co-curricular' values
        if(opt.length > 13 && value.q9.toLowerCase().indexOf(opt) > 0){
          output.push(value);
        }

      });
    } else {
      output = input;
    }

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

      if (opt == 'all'){
        angular.forEach(input, function(value, key){
            output.push(value);
        });
      } else {
        angular.forEach(input, function(value, key){
          if(opt === value.q1.toLowerCase()){
            output.push(value);
          }

        });
      }
    } else {
      output = input;
    }

    return output;
  }
});

// staff/faculty in-charge of the PolyX
app.filter("polyx_contact", function(){
  return function(input, option){
    var output = [];

    var opt = "";

    if(option != undefined) {
      opt = option.toLowerCase();

      angular.forEach(input, function(value, key){
        if(opt === value.q4.toLowerCase()){
          output.push(value);
        }

      });
    } else {
      output = input;
    }

    return output;
  }
});


// Class standing
app.filter("class", function(){
  return function(input, option){

    var output = [];
    var opt = "";

    if(option != undefined) {
      opt = option.toLowerCase();

      angular.forEach(input, function(value, key){

        if( value.q12.toLowerCase().indexOf(opt) > 0 ){
          output.push(value);
        }

      });
    } else {
      output = input;
    }

    return output;
  }
});

app.controller('PolyXController', function PolyXController($scope, $http) {

  var jsonFeed = 'assets/docs/updated-qualtrics.json';
  $http.get(jsonFeed).then(function(response){
    $scope.polyXList = response.data;
    console.log(response.data);

    $scope.names = getUniqueNames(response.data);
    console.log($scope.names);
  });

});


function getUniqueNames(arr){
  var names = [];
  var uniqueNames = []

  for(i=0; i<arr.length; i++){
    names.push(arr[i].q6);
  }
  return names;
}

// function uniqueArray(arr){
//   var a = [];
//   for (var i=0, l=arr.length; i<1; i++)
//     if (a.indexOf(arr[i] === -1))
// }
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
