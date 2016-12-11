'use strict';

angular.module('myblogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('edit', {
        url: '/posts',
        template: '<posts></posts>',
        params: { post: 'posts for edit' }
      });
  });
