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

    $scope.dotCols = [1,2,3,4,5,6,7];
    $scope.dotRows = [1,2,3,4];

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
                $('#calendar').fullCalendar('removeEvents');

                var events = recurrEvent('do the things', '2016-10-17T07:00:00.000Z');

                var allEvents = [];

                res.forEach(function(startEvent) {
                  var description = startEvent.description;
                  var startDate = startEvent.startDay;
                  allEvents = allEvents.concat(recurrEvent(description, startDate));
                })

                //refresh calendar to have updated events
                $('#calendar').fullCalendar('addEventSource', allEvents);
              })
              .error(function(res) {
                console.log('GET right after post = failz', res);
              });
          })
          .error(function(response) {
            console.log('error on POST:', response);
          });
      }
    };
  });