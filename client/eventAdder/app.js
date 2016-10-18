angular.module('eventAdder', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/eventAdder/form.html',
        controller: 'eventAdderCntrl'
      })
      // .otherwise({
      //   redirectTo: '/'
      // })
  })
  .controller('eventAdderCntrl', function($scope, $location, $http){
    $scope.warning = '';

    $scope.sendData = function() {
      //Invalid form data
      if ($scope.description === undefined || $scope.description === '') {
        $scope.warning = 'Please enter a description!';
      //Send POST request
      } else {
        var data = JSON.stringify({
          description: $scope.description,
          date: $scope.date
        });

        $http({
          method: 'POST',
          data: data,
          url: './addData'
        }).success(function(response) {
            console.log('response from post success!', response);
            //Send GET request after successful POST
            $http.get('./getEvents')
              .success(function(res) {
              //res now gets correct data... an array with all start event objects

              //pass events through recurr Event function to make events masterlist array

              //refresh calendar to have updated events


              console.log('GET right after post dataz-', res);
              })
              .error(function(res) {
              console.log('GET right after post = failz', res);
              });
          })
          .error(function(response) {
            console.log('error on POST:', response);
          });
      }

      console.log($scope.description, $scope.date);
    };

  });