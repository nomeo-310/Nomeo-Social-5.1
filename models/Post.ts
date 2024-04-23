import mongoose from 'mongoose';
import {  Schema } from 'mongoose';


const PostSchema:Schema = new Schema({
  postText: { type: String, default: '' },
  postImage: { type: Object, default: { public_id: '', secure_url: '' }},
  postLocation: {type: String, default: '' },
  postAuthor: { type: Schema.ObjectId, ref: 'User'},
  mood: { type: Boolean, default: false },
  totalLikes: { type: Number, default: 0 },
  likes: [{ type: Schema.ObjectId, ref: 'User'}],
  totalSaves: { type: Number, default: 0 },
  saves: [{ type: Schema.ObjectId, ref: 'User'}],
  isRepost: { type: Boolean, default: false },
  parentPost: { type: Schema.ObjectId, ref: 'Post'},
  repostAuthor: { type: Schema.ObjectId, ref: 'User'},
  showNotification: { type: Boolean, default: false },
  barredStatus: { type: Boolean, default: false },
  hidePost: { type: Boolean, default: false },
  postReported: { type: Boolean, default: false },
  totalReports: { type: Number, default: 0 },
  postType: {type: String, default: ''},
  totalComments: { type: Number, default: 0 },
  comments: [{ type: Schema.ObjectId, ref: 'Comment'}],
  reposts: [{ type: Schema.ObjectId, ref: 'User'}],
  totalReposts: { type: Number, default: 0 },
}, {timestamps: true}); 


(mongoose.models as any) = {};

const Post = mongoose.model('Post', PostSchema);

export default Post;