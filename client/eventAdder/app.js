angular.module('eventAdder', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/eventAdder/form.html',
        controller: 'eventAdderCntrl'
      })
      .otherwise({
        redirectTo: '/calendar'
      })
  })
  .controller('eventAdderCntrl', function($scope, $location){
    $scope.changePath = function() {
      console.log($location.path);
      $location.path('/calendar')
    };

  });