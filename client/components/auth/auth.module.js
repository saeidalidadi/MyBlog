'use strict';

angular.module('myblogApp.auth', ['myblogApp.constants', 'myblogApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
