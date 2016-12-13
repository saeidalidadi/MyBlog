'use strict';

(function(){

class PostsController {
  constructor($scope, $state, $http, Upload) {
    //this.$scope = $scope;
    this.$state = $state;
    this.$http = $http;
    this.Upload = Upload;
  }

  $onInit() {
    console.log('init');
    //this.post = this.$state.params.post;
  }

  _setNewPost () {
    console.log(this.image);
    this.Upload.upload({
      url: '/api/posts/',
      data: { image: this.image, content: { body: this.body, title: this.title } } 
    })
    .then( response => {
      console.log(response);
    })
    .catch( err => {
      console.log(err);
    })
  }

  publishPost (post) {
    console.log('publishing post');
    this._setNewPost();
  }

  saveNewPost (post) {
    //post.state = 'unpublished';
    this._setNewPost()
  }
}

angular.module('myblogApp')
  .component('posts', {
    templateUrl: 'app/posts/posts.html',
    controller: PostsController
    //controllerAs: 'postsCtrl'
  });

})();
