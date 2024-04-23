import mongoose from 'mongoose';
import {  Schema } from 'mongoose';


const CommentSchema:Schema = new Schema({
  commentText: { type: String, default: '' },
  commentType: {type: String, default: '' },
  commentAuthor: { type: Schema.ObjectId, ref: 'User'},
  postId: { type: Schema.ObjectId, ref: 'Post'},
  isReply: { type: Boolean, default: false },
  totalLikes: { type: Number, default: 0 },
  likes: [{ type: Schema.ObjectId, ref: 'User'}],
  childrenComments: [{ type: Schema.ObjectId, ref: 'Comment'}],
  totalChildrenComments: {type: Number, default: 0},
  parentComments: { type: Schema.ObjectId, ref: 'Comment'},
}, {timestamps: true}); 


(mongoose.models as any) = {};

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;