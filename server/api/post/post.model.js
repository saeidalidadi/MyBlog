'use strict';

import mongoose from 'mongoose';

var postSchema = new mongoose.Schema({
  title: String,
  body: String,
  img: { data: Buffer, contentType: String }
});

export default mongoose.model('Post', postSchema);
