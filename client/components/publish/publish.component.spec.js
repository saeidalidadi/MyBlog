'use strict';

describe('Component: publish', function () {

  // load the component's module
  beforeEach(module('myblogApp'));

  var publishComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController) {
    publishComponent = $componentController('publish', {});
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
