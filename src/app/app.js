'use strict';

var angular = require('angular');

var app = angular.module('app', [
  require('angular-ui-router/release/angular-ui-router')
]);

require('./main');

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
  $stateProvider.state('main', {
    url: '/',
    templateUrl: './app/main/main.html',
    controller: 'MainCtrl'
  });

  $urlRouterProvider.otherwise('/');
}]);

app.run(['$rootScope', function ($rootScope) {
  console.log('app running');
}]);


