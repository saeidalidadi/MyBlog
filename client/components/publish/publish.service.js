class postService {

  constructor($state, $http, Upload) {
    //this.$scope = $scope;
    this.$http = $http;
    this.Upload = Upload;
  }

  _setNewPost (post) {
    this.Upload.upload({
      url: '/api/posts/',
      data: post 
    })
    .then( response => {
        console.log(response);
    }, 
      err => { console.log(err); },
      progress => { console.log(progress); }
    )
  }

  publishPost (post) {
    console.log('publishing post');
    this._setNewPost(post);
  }

  savePost (post) {
    //post.state = 'unpublished';
    this._setNewPost(post)
  }

}

angular.module('myblogApp').service('Post', postService);
