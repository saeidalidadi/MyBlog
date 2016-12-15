'use strict';

class publishController {
  
  constructor($scope, $state, $http, Upload, Post) {
    //this.$scope = $scope;
    this.$state = $state;
    this.$http = $http;
    this.Upload = Upload;
    this.Post = Post;
  }

  $onInit() {
    console.log('init');
    //this.post = this.$state.params.post;
  }

  publish (post) {
    console.log('publishing post');
    this.Post.publishPost({
      image: this.image,
      content: { body: this.body, title: this.title }
    });
  }

  save (post) {
    console.log(this.image);
    //post.state = 'unpublished';
    this.Post.publishPost({
      image: this.image,
      content: { body: this.body, title: this.title, state: 'unpublished' }
    });
  }
}

angular.module('myblogApp')
  .component('publish', {
    templateUrl: 'components/publish/publish.html',
    bindings: { message: '<' },
    controller: publishController
});
