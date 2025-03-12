const Post = require("../models/Post");
const logger = require("../utils/logger");
const { validatePost } = require("../utils/validation");

const createPost = async (req, res) => {
  logger.info("Create Post endpoint hit...");
  try {
    //validate the schema
    const { error } = validatePost(req.body);
    if (error) {
      logger.warn("Validation error", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { content, mediaIds, title } = req.body;
    const newlyCreatedPost = new Post({
      user: req.user.userId,
      title,
      content,
      mediaIds: mediaIds || [],
    });
    await newlyCreatedPost.save();
    logger.info("Post created successfully", newlyCreatedPost);
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      // data: newlyCreatedPost
    });
  } catch (error) {
    logger.error("Error creating post", error);
    res.status(500).json({
      success: false,
      message: "Internal server error 1",
    });
  }
};

const getAllPost = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * 10;

    const cacheKey = `posts:${page}:${limit}`;
    const cachedPost = await req.redisClient.get(cacheKey);
    if (cachedPost) {
      return res.json(JSON.parse(cachedPost));
    }

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const totalNoOfPosts = await Post.countDocuments();
    const result = {
      posts,
      currentpage: page,
      totalPages: Math.ceil(totalNoOfPosts / limit),
      totalPosts: totalNoOfPosts,
    };
    //save post in redis cache
    await req.redisClient.setex(cacheKey, 300, JSON.stringify(result));

    res.json(result);
  } catch (error) {
    logger.error("Error Fetching post", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getPost = async (req, res) => {
  try {
  } catch (error) {
    logger.error("Error Getting post", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const deletePost = async (req, res) => {
  try {
  } catch (error) {
    logger.error("Error Getting post", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { createPost, getAllPost, getPost, deletePost };
