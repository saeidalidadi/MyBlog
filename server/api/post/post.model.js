'use strict';

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import Moment from 'moment';

const Schema = mongoose.Schema;
var postSchema = new Schema({
  title: { type: String, maxlength: 60,   minlength: 10, required: true },
  body:  { type: String, maxlength: 1000, minlength: 30, required: true },
  user_id: Schema.Types.ObjectId,
  img:   { data: Buffer, contentType: String },
  state: { type: String, enum: ['published', 'deleted', 'unpublished'] },
  created_at: { type: Date, default: Moment().format() }
});

postSchema.plugin(mongoosePaginate);
export default mongoose.model('Post', postSchema);
