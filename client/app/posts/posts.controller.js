'use strict';

(function(){

class PostsController {
  constructor($scope, $state, $http) {
    //this.$scope = $scope;
    this.$state = $state;
    this.$http = $http;
  }

  $onInit() {
    console.log('init');
    //this.post = this.$state.params.post;
  }

  saveNewPost () {
    console.log('new post');
    this.$http.post('/api/posts', {
      title: this.title,
      body: this.body,
      state: 'unpublished'
    })
    .then( response => {
      console.log(response);
    })
    .catch( err => {
      console.log(err);
    })
  }
}

angular.module('myblogApp')
  .component('posts', {
    templateUrl: 'app/posts/posts.html',
    controller: PostsController
    //controllerAs: 'postsCtrl'
  });

})();
