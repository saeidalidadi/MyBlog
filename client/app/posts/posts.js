'use strict';

angular.module('myblogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('publish', {
        url: '/publish',
        template: '<publish></publish>',
        authenticate: 'user'
      });
  });
