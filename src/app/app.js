'use strict';

var angular = require('angular');


// declare app + require deps
var app = angular.module('app', [
  require('angular-ui-router/release/angular-ui-router')
]);

// app modules
// must be loaded once the app has been declared
require('./app-templates')
require('./main');


app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

  $stateProvider.state('main', {
    url: '/',
    // this route is defined in the loaded templates
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  });

  $urlRouterProvider.otherwise('/');
}]);

app.run(['$rootScope', function ($rootScope) {
  console.log('app running');
}]);

// we could export it here
// module.exports = app;

