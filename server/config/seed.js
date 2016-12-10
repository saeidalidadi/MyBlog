/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Post from '../api/post/post.model';
import User from '../api/user/user.model';
import Fs from 'fs';

let imageRelativePath = __dirname + '/../api/post/images/';

Post.find({}).remove()
  .then(() => {
    Post.create({
      title: 'Development Tools',
      body: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.',
      img: { data: Fs.readFileSync(imageRelativePath + 'flw_1.jpg'), contentType: 'image/jpg' }
    }, {
      title: 'Server and Client integration',
      body: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.',
      img: { data: Fs.readFileSync(imageRelativePath + 'flw_2.jpg'), contentType: 'image/jpg' }

    }, {
      title: 'Smart Build System',
      body: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html',
      img: { data: Fs.readFileSync(imageRelativePath + 'flw_3.jpg'), contentType: 'image/jpg' }

    }, {
      title: 'Modular Structure',
      body: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      title: 'Optimized Build',
      body: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      title: 'Deployment Ready',
      body: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
