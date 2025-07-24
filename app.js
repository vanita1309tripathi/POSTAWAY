import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

import userRouter from './User/user.routes.js';
import postRouter from './Post/post.routes.js';



dotenv.config();

const app = express();
app.use(express.json());//parse income json request in body
app.use(cookieParser());

// Serve image files publicly
app.use("/uploads", express.static("uploads"));

// Connect DB
connectDB();

// User related Routes
app.use('/api/users', userRouter);

//Post related routes
app.use("/api/posts", postRouter);

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running at port 5000...");
});
