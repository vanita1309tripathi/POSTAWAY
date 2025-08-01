// features/Post/post.controller.js
import {
  createPost,
  getAllPosts,
  likePost,
  unlikePost,
  addComment
} from "./post.repo.js";

export const handleCreatePost = async (req, res) => {
  try {
    const { content } = req.body;
    // "If req.file exists, then get req.file.filename. 
    // If req.file is undefined, don’t throw an error — just return undefined."
    const image = req.file?.filename; // multer adds req.file
    const author = req.user._id; // from auth middleware

    const post = await createPost({ content, image, author });
    res.status(201).json({ msg: "Post created", post });
  } catch (err) {
    res.status(500).json({ msg: "Post creation failed", error: err.message });
  }
};


export const handleGetAllPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};

export const handleLikePost = async (req, res) => {
  try {
    const post = await likePost(req.params.postId, req.user._id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error liking post" });
  }
};

export const handleUnlikePost = async (req, res) => {
  try {
    const post = await unlikePost(req.params.postId, req.user._id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error unliking post" });
  }
};

export const handleAddComment = async (req, res) => {
  try {
    const commentData = {
      user: req.user._id,
      text: req.body.text
    };

    const post = await addComment(req.params.postId, commentData);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error adding comment" });
  }
};
