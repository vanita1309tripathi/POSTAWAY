//Post/post.routes.js
import express from "express";
import multer from "multer";
import { verifyToken } from "../../middlewares/auth.middleware.js";
import {
  handleCreatePost,
  handleGetAllPosts,
  handleLikePost,
  handleUnlikePost,
  handleAddComment
} from "./post.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage });

router.get("/", handleGetAllPosts);
router.post("/", verifyToken, upload.single("image"), handleCreatePost);
router.post("/:postId/like", verifyToken, handleLikePost);
router.post("/:postId/unlike", verifyToken, handleUnlikePost);
router.post("/:postId/comment", verifyToken, handleAddComment);

export default router;
