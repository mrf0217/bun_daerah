import express from 'express';
const router = express.Router();
import kabupatenController from '../controllers/kabupatenController.js';

router.get('/', kabupatenController.getAll);
router.get('/:wilayah', kabupatenController.getById);
router.post('/', kabupatenController.create);

export default router;
