// src/controllers/commentController.js
import { Comment } from '../models/index.js';
import { logApiAccess, logApiStart } from '../utils/apiLogger.js';

export const createComment = async (req, res) => {
  logApiStart(req);
  
  try {
    const { comment } = req.body;
    
    // Validation
    if (!comment) {
      const errorResponse = {
        status: false,
        data: [],
        message: "Comment is required"
      };
      
      res.status(400).json(errorResponse);
      
      // Log validation error
      await logApiAccess(req, res, null, { message: "Validation failed: missing comment" });
      return;
    }

    const newComment = await Comment.create({
      comment,
      waktu: new Date(),
      Version: 1
    });

    const successResponse = {
      status: true,
      data: {
        id: newComment.id,
        comment: newComment.comment,
        waktu: newComment.waktu,
        Version: newComment.Version
      },
      message: "Comment created successfully"
    };
    
    res.status(201).json(successResponse);
    
    // Log successful creation
    await logApiAccess(req, res, { 
      commentId: newComment.id, 
      comment: newComment.comment,
      Version: newComment.Version 
    });
    
  } catch (err) {
    const errorResponse = {
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    };
    
    res.status(500).json(errorResponse);
    
    // Log error
    await logApiAccess(req, res, null, err);
  }
};

export const getComments = async (req, res) => {
  logApiStart(req);
  
  try {
    
    
    const offset = (page - 1) * limit;
    
    const comments = await Comment.findAndCountAll({
      order: [['waktu', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const responseData = {
      status: true,
      data: {
        comments: comments.rows,
        pagination: {
          total: comments.count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(comments.count / limit)
        }
      },
      message: "Comments retrieved successfully"
    };
    
    res.json(responseData);
    
    // Log successful retrieval
    await logApiAccess(req, res, { 
      commentCount: comments.rows.length,
      totalCount: comments.count,
      page: parseInt(page)
    });
    
  } catch (err) {
    const errorResponse = {
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    };
    
    res.status(500).json(errorResponse);
    
    // Log error
    await logApiAccess(req, res, null, err);
  }
};

export const updateComment = async (req, res) => {
  logApiStart(req);
  
  try {
    const { id } = req.params;
    const { comment, Version } = req.body;
    
    if (!comment) {
      const errorResponse = {
        status: false,
        data: [],
        message: "Comment is required"
      };
      
      res.status(400).json(errorResponse);
      
      // Log validation error
      await logApiAccess(req, res, null, { message: "Validation failed: missing comment" });
      return;
    }

    const existingComment = await Comment.findByPk(id);
    if (!existingComment) {
      const errorResponse = {
        status: false,
        data: [],
        message: "Comment not found"
      };
      
      res.status(404).json(errorResponse);
      
      // Log not found
      await logApiAccess(req, res, null, { message: "Comment not found" });
      return;
    }

    await existingComment.update({ 
      comment,
      Version: Version || existingComment.Version + 1
    });

    const successResponse = {
      status: true,
      data: {
        id: existingComment.id,
        comment: existingComment.comment,
        waktu: existingComment.waktu,
        Version: existingComment.Version
      },
      message: "Comment updated successfully"
    };
    
    res.json(successResponse);
    
    // Log successful update
    await logApiAccess(req, res, { 
      commentId: existingComment.id, 
      comment: existingComment.comment,
      Version: existingComment.Version
    });
    
  } catch (err) {
    const errorResponse = {
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    };
    
    res.status(500).json(errorResponse);
    
    // Log error
    await logApiAccess(req, res, null, err);
  }
};

export default {
  createComment,
  getComments,
  updateComment
};
