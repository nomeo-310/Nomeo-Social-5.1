import mongoose from 'mongoose';
import {  Schema } from 'mongoose';


const UserSchema:Schema = new Schema({
  username: { type: String, default: '' },
  name: {type: String, default: '' },
  email: { type: String, require: true, unique:true },
  hashedPassword: { type: String },
  image: { type:String, default: ""},
  profileImage: { type: Object, default: { public_id: '', secure_url: '' }},
  coverImage: { type: Object, default: { public_id: '', secure_url: '' }},
  occupation: { type: String, default: ''},
  savedPosts: [{ type: Schema.ObjectId, ref: 'Post'}],
  totalSavedPosts: { type: Number, default: 0 },
  reposts: [{ type: Schema.ObjectId, ref: 'Post'}],
  totalReposts: { type: Number, default: 0 },
  followers: [{ type: Schema.ObjectId, ref: 'User'}],
  totalFollowers: { type: Number, default: 0 },  
  followings: [{ type: Schema.ObjectId, ref: 'User'}],
  totalFollowings: { type: Number, default: 0 },
  state: { type: String, default: ''},
  country: { type: String, default: ''},
  bio:{ type: String, default: ''},
  createdPosts:  [{ type: Schema.ObjectId, ref: 'Post'}],
  totalCreatedPosts: { type: Number, default: 0 },
  totalNotifications: { type: Number, default: 0 },
  twitterUrl: { type: String, default: ''},
  facebookUrl: { type: String, default: ''},
  instagramUrl: { type: String, default: ''},
  personalWebsite: { type: String, default: ''},
  notifications:  [{ type: Schema.ObjectId, ref: 'Notification'}],
}, {timestamps: true}); 


(mongoose.models as any) = {};

const User = mongoose.model('User', UserSchema);

export default User;