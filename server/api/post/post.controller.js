/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/posts              ->  index
 * POST    /api/posts              ->  create
 * GET     /api/posts/:id          ->  show
 * PUT     /api/posts/:id          ->  update
 * DELETE  /api/posts/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Post from './post.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function respondWhitImage(res) {
  return function(entity) {
    if(entity && entity.img) {
      res.contentType(entity.img.contentType);
      res.status(200).send(entity.img.data);
    } else {
      res.status(404).end();
    }
  }
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Posts
export function index(req, res) {

  const page = req.query.page || 1;
  const per_page = 2;

  return Post.paginate({}, {
    select:'title body user_id',
    page: page, limit: 2
  }, (err, result) => {
    respondWithResult(res)({
      data: result.docs,
      total: result.total,
      page: result.page,
      pages: result.pages
    });
  });
}

// Gets a single Post from the DB
export function show(req, res) {
  return Post.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Post in the DB
export function create(req, res) {
  const file = req.file || {};
  const content = req.body.content || {};
  setTimeout( () => {
    return Post.create({
        title: content.title,
        body: content.body,
        user_id: req.user._id,
        img: { data: file.buffer, contentType: file.mimetype } 
      })
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  }, 1000)
}

// Updates an existing Post in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  setTimeout( () => {
  return Post.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
  }, req.app.locals.timeOut)
}

// Deletes a Post from the DB
export function destroy(req, res) {
  return Post.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Get image of post from DB
export function image(req, res) {
  const id = require('mongoose').Types.ObjectId(req.params.id);
  Post.findById(id, 'img.data img.contentType').exec()
  .then(handleEntityNotFound(res))
  .then(respondWhitImage(res))
  .catch(handleError(res));
  
}
