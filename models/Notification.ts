import mongoose from 'mongoose';
import {  Schema } from 'mongoose';


const NotificationSchema:Schema = new Schema({
  notificationCreatedBy: { type: Schema.ObjectId, ref: 'User'},
  type: { type: String, default: '' },
  isLikedComment: { type: Boolean, default: false},
  isLiked: { type: Boolean, default: false},
  isReply: { type: Boolean, default: false},
  isComment: { type: Boolean, default: false},
  isReport: { type: Boolean, default: false},
  isBarred:  { type: Boolean, default: false},
  post: { type: Schema.ObjectId, ref: 'Post'},
  comment: { type: Schema.ObjectId, ref: 'Comment'},
  notificationFor: { type: Schema.ObjectId, ref: 'User'},
  notificationSeen:  { type: Boolean, default: false}, 
}, {timestamps: true}); 


(mongoose.models as any) = {};

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;
