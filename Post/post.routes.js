//Post/post.routes.js
import express from "express";
import multer from "multer";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import {
  handleCreatePost,
  handleGetAllPosts,
  handleLikePost,
  handleUnlikePost,
  handleAddComment
} from "./post.controller.js";

const postRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }
});


postRouter.get("/", handleGetAllPosts);
postRouter.post("/", auth, upload.single("image"), handleCreatePost);
postRouter.post("/:postId/like", auth, handleLikePost);
postRouter.post("/:postId/unlike", auth, handleUnlikePost);
postRouter.post("/:postId/comment", auth, handleAddComment);

export default postRouter;
