'use strict';

var app = require('../..');
import request from 'supertest';

var newThing;

describe('Thing API:', function() {

  describe('GET /api/posts', function() {
    var posts;

    beforeEach(function(done) {
      request(app)
        .get('/api/posts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          posts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      posts.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/posts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/posts')
        .send({
          name: 'New Thing',
          info: 'This is the brand new post!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newThing = res.body;
          done();
        });
    });

    it('should respond with the newly created post', function() {
      newThing.name.should.equal('New Thing');
      newThing.info.should.equal('This is the brand new post!!!');
    });

  });

  describe('GET /api/posts/:id', function() {
    var post;

    beforeEach(function(done) {
      request(app)
        .get('/api/posts/' + newThing._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          post = res.body;
          done();
        });
    });

    afterEach(function() {
      post = {};
    });

    it('should respond with the requested post', function() {
      post.name.should.equal('New Thing');
      post.info.should.equal('This is the brand new post!!!');
    });

  });

  describe('PUT /api/posts/:id', function() {
    var updatedThing;

    beforeEach(function(done) {
      request(app)
        .put('/api/posts/' + newThing._id)
        .send({
          name: 'Updated Thing',
          info: 'This is the updated post!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedThing = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedThing = {};
    });

    it('should respond with the updated post', function() {
      updatedThing.name.should.equal('Updated Thing');
      updatedThing.info.should.equal('This is the updated post!!!');
    });

  });

  describe('DELETE /api/posts/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/posts/' + newThing._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when post does not exist', function(done) {
      request(app)
        .delete('/api/posts/' + newThing._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
