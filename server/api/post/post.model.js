'use strict';

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;
var postSchema = new Schema({
  title: String,
  body: String,
  user_id: Schema.Types.ObjectId
});

postSchema.plugin(mongoosePaginate);
export default mongoose.model('Post', postSchema);
