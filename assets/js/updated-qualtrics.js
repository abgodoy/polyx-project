var app = angular.module('polyXApp', []);

// College division
app.filter("college_division", function() {
  return function(input, option) {
    var output = [];

    var opt = "";


    if (option != null) {
      opt = option;
      if (opt == 'all') {
        angular.forEach(input, function(value, key) {
          output.push(value);
        });
        console.log('option: ' + opt);
        console.log(output);
      } else {
        angular.forEach(input, function(value, key) {
          if (value.q7 == opt) {
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
app.filter("curr", function() {
  return function(input, option) {
    var output = [];

    var opt = "";
    var tmp = "";
    var q9 = ""
    if (option != undefined) {
      console.log('option: ' + option);
      angular.forEach(input, function(value, key) {
        q9 = value.q9.toLowerCase();
        switch (option) {
          case 'curricular':
            if (q9.indexOf('curricular') >= 0 && (q9.length <= 10 || q9.length > 13)) {
              output.push(value);
            }
            break;
          case 'co-curricular':
            if (q9.indexOf('co-curricular') >= 0 && (q9.length > 10)) {
              output.push(value);
            }
            break;
          default:
            console.log('this is the default');
            output.push(value);
        }
      }); //end forEach

    } else {
      output = input;
    }

    return output;
  }
});

// PolyX name
app.filter("polyx_name", function() {
  return function(input, option) {
    var output = [];

    var opt = "";

    if (option != undefined) {
      opt = option.toLowerCase();

      if (opt == 'all') {
        angular.forEach(input, function(value, key) {
          output.push(value);
        });
      } else {
        angular.forEach(input, function(value, key) {
          if (opt === value.q1.toLowerCase()) {
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
app.filter("polyx_contact", function() {
  return function(input, option) {
    var output = [];

    var opt = "";

    if (option != undefined) {
      opt = option.toLowerCase();

      if (opt == 'all') {
        angular.forEach(input, function(value, key) {
          output.push(value);
        });
      } else {
        angular.forEach(input, function(value, key) {
          if (opt === value.q4.toLowerCase()) {
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
app.filter("class", function() {
  return function(input, option) {

    var output = [];
    var opt = "";

    if (option != undefined) {
      opt = option.toLowerCase();

      angular.forEach(input, function(value, key) {

        if (value.q12.toLowerCase().indexOf(opt) > 0) {
          output.push(value);
        }

      });
    } else {
      output = input;
    }

    return output;
  }
});

// app.filter("reset", function() {
//   return function(input, option) {
//
//
//     return input;
//   }
// });

//**********MAIN APP CONTROLLER**********//
app.controller('PolyXController', function PolyXController($scope, $http) {

  var jsonFeed = 'assets/docs/updated-qualtrics.json';
  $http.get(jsonFeed).then(function(response) {
    $scope.polyXList = response.data;
    console.log(response.data);

    $scope.names = getUniqueContacts(response.data);
    $scope.titles = getPolyXTitles(response.data);
    $scope.divisions = getUniqueDivisions(response.data);

    $scope.resetPolytechnicForm = function(){
      console.log('reset has been clicked');
      //$scope.searchQuery = {};
      $scope.division_option = null;
      $scope.standing = null;
      $scope.contact_option = null;
      $scope.curricular_type = null;
      $scope.polyx_name_option = null;

    };

  });
});

//**********SUBROUTINES TO AUTOMATE FORM INPUTS**********//

// get unique contacts list for dropdown menu
function getUniqueContacts(arr) {
  var contact = {};
  var contacts = [];
  var uniques = [];

  for (i = 0; i < arr.entries.length; i++) {
    var fullName = arr.entries[i].q5 + ", " + arr.entries[i].q6;
    var email = arr.entries[i].q4;

    // check if email exists on the list
    if (uniques.indexOf(email) == -1) {
      uniques.push(email);
      contact = {
        fullName: fullName,
        email: email
      };
      contacts.push(contact);
    }
  }

  contacts.sort((a, b) => (a.fullName > b.fullName) ? 1 : -1);
  return contacts;

}

// get Polytechnic Experience Titles for dropdown menu
function getPolyXTitles(arr) {
  var titles = [];

  for (i = 0; i < arr.entries.length; i++) {
    titles.push(arr.entries[i].q1);
  }

  titles.sort();
  return titles;
}

// get Unique Division for the dropdown menu
function getUniqueDivisions(arr) {
  var divisions = [];
  var uniques = [];

  for (i = 0; i < arr.entries.length; i++) {
    var division = arr.entries[i].q7;

    if (uniques.indexOf(division) == -1) {
      uniques.push(division);
      divisions.push(division);
    }
  }
  divisions.sort();
  return divisions;
}
