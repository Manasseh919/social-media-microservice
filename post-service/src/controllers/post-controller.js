const Post = require('../models/Post');
const logger = require('../utils/logger');


export const createPost = async(req,res) =>{
    try {
        const {content,mediaIds} = req.body
        const newlyCreatedPost = new Post({
            user:req.userId,
            content,
            mediaIds : mediaIds || []
            
        })
        await newlyCreatedPost.save()
        logger.info("Post created successfully", newlyCreatedPost)
        res.status(201).json({
            success: true,
            message: "Post created successfully",
            // data: newlyCreatedPost
        })
        
    } catch (error) {
        logger.error("Error creating post", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}


export const getAllPost = async(req,res) =>{
    try {
        
    } catch (error) {
        logger.error("Error Fetching post", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}


export const getPost = async(req,res) =>{
    try {
        
    } catch (error) {
        logger.error("Error Getting post", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
export const deletePost = async(req,res) =>{
    try {
        
    } catch (error) {
        logger.error("Error Getting post", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}