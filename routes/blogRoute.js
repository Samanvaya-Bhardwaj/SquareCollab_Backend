import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";
import {
  createBlogController,
  deleteBlogController,
  getBlogController,
  getSingleBlogController,
  updateBlogController,
  blogPhotoController,
  searchBlogController,
} from "../controllers/blogController.js";
import formidable from "express-formidable";

const router = express.Router();

// Create blog post
router.post(
  "/create-blog",
  requireSignIn,
  isAdmin,
  formidable(),
  createBlogController
);

// Update blog post
router.put(
  "/update-blog/:bid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateBlogController
);

// Get all blog posts
router.get("/get-blogs", getBlogController);

// Get single blog post
router.get("/get-blog/:slug", getSingleBlogController);

// Get blog post photo
router.get("/blog-photo/:bid", blogPhotoController);

// Delete blog post
router.delete("/delete-blog/:bid", deleteBlogController);

// Search blog posts
router.get("/search/:keyword", searchBlogController);

export default router;
