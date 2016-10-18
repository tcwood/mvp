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
      if ($scope.description === undefined || $scope.description === '') {
        $scope.warning = 'Please enter a description!';
      } else {
        var data = JSON.stringify({
          description: $scope.description,
          date: $scope.date
        });

        $http({
          method: 'POST',
          data: data,
          url: '/addData'
        }).then(function successCallback(response) {
            console.log('response from post success!', response);
            $http.get('/')
            .then(function successCallback(res) {
              console.log('GET right after post dataz-', res.data);
            }), function errorCallback(res) {
              console.log('GET right after post = failz', res);
            }
          }, function errorCallback(response) {
            console.log('error:', response);
          });
      }

      console.log($scope.description, $scope.date);
    };

  });