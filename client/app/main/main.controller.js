'use strict';

(function() {

  class MainController {

    constructor(Auth, $http, $scope, $state) {
      this.$state = $state;
      this.$http = $http;
      this.posts = [];
      this.$scope = $scope;
      this.isLoggedIn = Auth.isLoggedIn;
      this.isAdmin = Auth.isAdmin;
      this.getCurrentUser = Auth.getCurrentUser;
    }

    $onInit() {
      this.$http.get('/api/posts')
        .then(response => {
          this.posts = response.data;
          this.currentPage = 1;
          this.totalItems = response.data.total;
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

    onChange(page) {
      this.$http.get('/api/posts?page=' + this.currentPage)
      .then( response => {
        this.posts = response.data;
      })
    }
    
    editPost(post) {
      this.$state.go('edit', { post: post });
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
