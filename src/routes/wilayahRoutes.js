import express from 'express';
const router = express.Router();
import wilayahController from '../controllers/wilayahController.js'
import { cacheMiddleware } from '../middleware/cache.js';

router.get('/', 
  cacheMiddleware((req) => `wilayah:all`, 120),
  wilayahController.getAll
);
router.get('/provinsi', 
  cacheMiddleware((req) => `wilayah:provinsi`, 300),
  wilayahController.getProvinsi
);
router.get('/kabupaten', 
  cacheMiddleware((req) => `wilayah:kabupaten`, 300),
  wilayahController.getKabupaten)
  ;
router.get('/:wilayah', 
  cacheMiddleware((req) => `wilayah:${req.params.wilayah}`, 300),
  wilayahController.getByWilayah
);

export default router;
