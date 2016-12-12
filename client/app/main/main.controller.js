'use strict';

(function() {

  class MainController {

    constructor(Auth, $http, $scope, $state, cfpLoadingBar) {
      this.$state = $state;
      this.$http = $http;
      this.posts = [];
      this.$scope = $scope;
      this.isLoggedIn = Auth.isLoggedIn;
      this.currentUser = Auth.getCurrentUser;
      this.editable = false;
    }

    $onInit() {
      this.$http.get('/api/posts')
        .then(response => {
          this.posts = response.data;
          this.currentUser( (user) => {
            console.log(user);
            this.user_id = user._id;
          });
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

    onChange() {
      this.$http.get('/api/posts?page=' + this.currentPage)
      .then( response => {
        this.posts = response.data;
      })
    }
    
    isCurrent () {
      return true;
    }
    _setPost(post) {
      this.$http.put('/api/posts/' + post._id, post)
      .then(response => {
        console.log('updated');
        post.inEdit = false;
      })
      .catch( () => {
        console.log('error');
      })
      .finally( () => {
        console.log('updating');
      });  
    }

    savePost(index) {
      const post = this.posts.data[index]
      post.state = 'unpublished';
      return this._setPost(post);
    }

    updatePost (index) {
      const post =this.posts.data[index];
      return this._setPost(post);
    }

    editPost(index) {
      //this.$state.go('edit', { post: post });
      console.log(this.posts)
      this.posts.data[index].inEdit = true;
    }

    deletePost(index) {
      const post = this.posts.data[index];
      this.$http.delete('/api/posts/' + post._id)
      .then( () => {
        this.onChange();
        //this.posts.data.slice(index, 1);
        //this.totalItems--;
      });
    }
  }

  angular.module('myblogApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
