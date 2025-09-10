import express from 'express';
const router = express.Router();
import provinsiController from '../controllers/provinsiController.js'

router.get('/', provinsiController.getAll);
router.get('/:wilayah', provinsiController.getById);
router.post('/', provinsiController.create);

export default router;
