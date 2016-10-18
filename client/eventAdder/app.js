angular.module('eventAdder', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/eventAdder/form.html',
        controller: 'eventAdderCntrl'
      })
      .otherwise({
        redirectTo: '/'
      })
  })
  .controller('eventAdderCntrl', function($scope, $location, $http){
    $scope.warning = '';

    $scope.sendData = function() {
      if ($scope.title === undefined || $scope.title === '') {
        $scope.warning = 'Please enter a description!';
      } else {
        var data = JSON.stringify({
          title: $scope.title,
          date: $scope.date
        });


        $http({
          method: 'POST',
          data: data,
          url: '/addData'
        }).then(function successCallback(response) {
            console.log(response);


            // this callback will be called asynchronously
            // when the response is available
          }, function errorCallback(response) {
            console.log('error:', response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      }


      console.log($scope.title, $scope.date);
    };

  });