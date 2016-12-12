'use strict';

angular.module('myblogApp', [
  'myblogApp.auth',
  'myblogApp.admin', 'myblogApp.constants',
  'ngCookies', 'ngResource', 'ngSanitize', 'ui.router',
  'ui.bootstrap', 'validation.match',
  'angular-loading-bar'
  ])
  .config(function($urlRouterProvider, $locationProvider, uibPaginationConfig) {
    $urlRouterProvider.otherwise('/');
    uibPaginationConfig.itemsPerPage = 2;
    $locationProvider.html5Mode(true);
  });
