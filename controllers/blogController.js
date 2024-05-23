import blogModel from "../models/blogModel.js";
import fs from "fs";
import slugify from "slugify";

// Create blog post
export const createBlogController = async (req, res) => {
  try {
    const { title, content, author, tags, published } = req.fields;
    const { image } = req.files;

    // Validation
    switch (true) {
      case !title:
        return res.status(400).send({ error: "Title is Required" });
      case !content:
        return res.status(400).send({ error: "Content is Required" });
      case !author:
        return res.status(400).send({ error: "Author is Required" });
    }

    const blog = new blogModel({ ...req.fields, slug: slugify(title) });
    if (image) {
      blog.image.data = fs.readFileSync(image.path);
      blog.image.contentType = image.type;
    }
    await blog.save();
    res.status(201).send({
      success: true,
      message: "Blog Created Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating blog",
    });
  }
};

// Get all blog posts
export const getBlogController = async (req, res) => {
  try {
    const blogs = await blogModel
      .find({})
      .select("-image")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalBlogs: blogs.length,
      message: "All Blogs",
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting blogs",
      error: error.message,
    });
  }
};

// Get single blog post
export const getSingleBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      .findOne({ slug: req.params.slug })
      .select("-image");
    res.status(200).send({
      success: true,
      message: "Single Blog Fetched",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single blog",
      error,
    });
  }
};

// Get blog post image
export const blogPhotoController = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.bid).select("image");
    if (blog.image.data) {
      res.set("Content-type", blog.image.contentType);
      return res.status(200).send(blog.image.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting image",
      error,
    });
  }
};

// Delete blog post
export const deleteBlogController = async (req, res) => {
  try {
    await blogModel.findByIdAndDelete(req.params.bid).select("-image");
    res.status(200).send({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting blog",
      error,
    });
  }
};

// Update blog post
export const updateBlogController = async (req, res) => {
  try {
    const { title, content, author, tags, published } = req.fields;
    const { image } = req.files;

    // Validation
    switch (true) {
      case !title:
        return res.status(400).send({ error: "Title is Required" });
      case !content:
        return res.status(400).send({ error: "Content is Required" });
      case !author:
        return res.status(400).send({ error: "Author is Required" });
    }

    const blog = await blogModel.findByIdAndUpdate(
      req.params.bid,
      { ...req.fields, slug: slugify(title) },
      { new: true }
    );
    if (image) {
      blog.image.data = fs.readFileSync(image.path);
      blog.image.contentType = image.type;
    }
    await blog.save();
    res.status(200).send({
      success: true,
      message: "Blog Updated Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating blog",
    });
  }
};

// Search blog posts
export const searchBlogController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await blogModel
      .find({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { content: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-image");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in search blog API",
      error,
    });
  }
};
