'use strict';

describe('Component: PostsComponent', function () {

  // load the controller's module
  beforeEach(module('myblogApp'));

  var PostsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    PostsComponent = $componentController('posts', {});
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
