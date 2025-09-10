import express from 'express';
const router = express.Router();
import wilayahController from '../controllers/wilayahController.js'

router.get('/', wilayahController.getAll);
router.get('/provinsi', wilayahController.getProvinsi);
router.get('/kabupaten', wilayahController.getKabupaten);
router.get('/:wilayah', wilayahController.getByWilayah);

export default router;
