'use strict';

import mongoose from 'mongoose';

var postSchema = new mongoose.Schema({
  title: String,
  body: String
});

export default mongoose.model('Post', postSchema);
