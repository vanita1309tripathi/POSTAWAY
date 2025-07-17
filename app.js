import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

import userRoutes from './routes/user.routes.js';
import postRoutes from "./features/Post/post.routes.js";



dotenv.config();

const app = express();
app.use(express.json());//parse income json request in body
app.use(cookieParser());
app.use("/uploads", express.static("uploads")); // to serve image files

// Connect DB
connectDB();

// User related Routes
app.use('/api/users', userRoutes);

//Post related routes
app.use("/api/posts", postRoutes);

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running at port 5000...");
});
