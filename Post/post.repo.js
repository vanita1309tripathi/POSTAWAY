// features/Post/post.repo.js
import { PostModel } from "./post.schema.js";

export const createPost = async (postData) => {
  return await PostModel.create(postData);
};

export const getAllPosts = async () => {
  return await PostModel.find().populate("author", "name").sort({ createdAt: -1 });
};

export const likePost = async (postId, userId) => {
  return await PostModel.findByIdAndUpdate(postId, {
    $addToSet: { likes: userId }
  }, { new: true });
};

export const unlikePost = async (postId, userId) => {
  return await PostModel.findByIdAndUpdate(postId, {
    $pull: { likes: userId }
  }, { new: true });
};

export const addComment = async (postId, commentData) => {
  return await PostModel.findByIdAndUpdate(postId, {
    $push: { comments: commentData }
  }, { new: true });
};
