'use strict';

describe('Component: mainComponent', function() {

  // load the controller's module
  beforeEach(module('myblogApp'));
  beforeEach(module('stateMock'));

  var scope;
  var mainComponent;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/posts')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    mainComponent = $componentController('main', {
      $http: $http,
      $scope: scope
    });
  }));

  it('should attach a list of posts to the controller', function() {
    mainComponent.$onInit();
    $httpBackend.flush();
    mainComponent.awesomeThings.length.should.equal(4);
  });
});
