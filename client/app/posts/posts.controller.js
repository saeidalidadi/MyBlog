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
  _setNewPost () {
    console.log(this.title);
    this.$http({
      method: 'POST',
      url: '/api/posts',
      headers: { 'Content-Type': 'multipart/form-data' },
      transformRequest: function (data) {
        console.log('transform inside');
        var formData = new FormData();
        formData.append("content", angular.toJson(data.content));
        formData.append("image", data.image);
        return formData;
      },
      data: {
        content: {
          title: 'dddddddddddddddd',
          body: 'eeeeeeeeeeeeeeee'
        },
        image: this.image
      }
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
    post.state = 'unpublished';
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
