// features/Post/post.schema.js
import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const commentSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new Schema({
  content: String,
  image: String, // will store image file path
  author: { type: Types.ObjectId, ref: "User" },
  likes: [{ type: Types.ObjectId, ref: "User" }],
  comments: [commentSchema]
}, { timestamps: true });

export const PostModel = model("Post", postSchema);
