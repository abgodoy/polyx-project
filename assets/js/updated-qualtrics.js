var app = angular.module('polyXApp', []);

// College division
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

// Curricular vs. Co-curricular
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

        //string length of more than 15 will only collect 'curricular and co-curricular' values
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

// Staff/Faculty in-charge of the PolyX
app.filter("polyx_contact", function(){
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
        if(opt === value.q4.toLowerCase()){
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

//**********MAIN APP CONTROLLER**********//
app.controller('PolyXController', function PolyXController($scope, $http) {

  var jsonFeed = 'assets/docs/updated-qualtrics.json';
  $http.get(jsonFeed).then(function(response){
    $scope.polyXList = response.data;
    console.log(response.data);

    $scope.names = getUniqueContacts(response.data);
    $scope.titles = getPolyXTitles(response.data);
    $scope.divisions = getUniqueDivisions(response.data);

  });
});

//**********SUBROUTINES TO AUTOMATE FORM INPUTS**********//

// get unique contacts list for dropdown menu
function getUniqueContacts(arr){
  var contact={};
  var contacts = [];
  var uniques = [];

  for(i=0; i<arr.entries.length; i++){
    var fullName=arr.entries[i].q5 +", " +arr.entries[i].q6;
    var email=arr.entries[i].q4;

    // check if email exists on the list
    if(uniques.indexOf(email) == -1){
      uniques.push(email);
      contact = {fullName:fullName, email:email};
      contacts.push(contact);
    }
  }

  contacts.sort((a, b) => (a.fullName > b.fullName) ? 1 : -1);
  return contacts;

}

// get Polytechnic Experience Titles for dropdown menu
function getPolyXTitles(arr){
  var titles=[];

  for(i=0; i<arr.entries.length; i++){
    titles.push(arr.entries[i].q1);
  }

  titles.sort();
  return titles;
}

// get Unique Division for the dropdown menu
function getUniqueDivisions(arr){
  var divisions=[];
  var uniques=[];

  for(i=0; i<arr.entries.length; i++){
    var division=arr.entries[i].q7;

    if(uniques.indexOf(division) == -1){
      uniques.push(division);
      divisions.push(division);
    }
  }
  divisions.sort();
  return divisions;
}
