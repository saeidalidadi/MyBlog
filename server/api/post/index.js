'use strict';

var express = require('express');
var controller = require('./post.controller');
var auth = require('../../auth/auth.service');
var upload = require('multer')();
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', upload.single('image'), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.get('/:id/image', controller.image);

module.exports = router;
