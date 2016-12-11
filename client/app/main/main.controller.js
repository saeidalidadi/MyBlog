'use strict';

(function() {

  class MainController {

    constructor($http) {
      this.$http = $http;
      this.posts = [];
    }

    $onInit() {
      this.$http.get('/api/posts')
        .then(response => {
          this.posts = response.data;
      });
    }

    addPost() {
      if (this.newPost) {
        this.$http.post('/api/posts', {
          title: this.newPost
        });
        this.newPost = '';
      }
    }

    deleteThing(post) {
      this.$http.delete('/api/posts/' + post._id);
    }
  }

  angular.module('myblogApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
