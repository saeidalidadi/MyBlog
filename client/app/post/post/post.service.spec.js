'use strict';

describe('Service: post', function () {

  // load the service's module
  beforeEach(module('myblogApp'));

  // instantiate service
  var post;
  beforeEach(inject(function (_post_) {
    post = _post_;
  }));

  it('should do something', function () {
    !!post.should.be.true;
  });

});
