// src/routes/commentRoutes.js
import express from 'express';
import commentController from '../controllers/commentController.js';

const router = express.Router();

// Public routes (no auth required)
router.post('/', commentController.createComment);
router.get('/', commentController.getComments);

// Update comment (no auth required for simplicity)
router.put('/:id', commentController.updateComment);

export default router;
