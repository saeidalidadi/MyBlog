'use strict';

(function(){

class PostsController {
  constructor($scope, $state) {
    this.message = 'Hello';
    //this.$scope = $scope;
    this.$state = $state;
  }

  $onInit() {
    //alert('init edit route');
    console.log('state of posts', this.$state.params);
    this.post = this.$state.params.post;
  }
}

angular.module('myblogApp')
  .component('posts', {
    templateUrl: 'app/posts/posts.html',
    controller: PostsController
    //controllerAs: 'postsCtrl'
  });

})();
