var moment = require('moment');
require('plugins/blackcat/less/main.less');
require('ui/chrome').setNavBackground('#222222').setTabs([]);

var app = require('ui/modules').get('apps/blackcat', []);

//require('ui/routes').enable();

require('ui/routes')
  .when('/', {
    template: require('plugins/blackcat/templates/index.html'),
    resolve: {
      currentTime: function ($http) {
        return $http.get('/blackcat/api/example')
        .then(function (resp) {
          return resp.data.time;
        });
      }
    }
  });

app.controller('blackcat', function ($scope, $route, $interval) {
  $scope.title = 'Blackcat';
  $scope.description = 'Blackcat Project';

  var currentTime = moment($route.current.locals.currentTime);
  $scope.currentTime = currentTime.format('HH:mm:ss');
  var unsubscribe = $interval(function () {
    $scope.currentTime = currentTime.add(1, 'second').format('HH:mm:ss');
  }, 1000);
  $scope.$watch('$destroy', unsubscribe);
});
