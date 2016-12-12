'use strict';

angular.module('myblogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('publish', {
        url: '/posts',
        template: '<posts></posts>',
        authenticate: 'user'
      });
  });
