import express from 'express';

import {
  // createProduct,
  // getProduct,
  // getProducts,
  // updateProduct,
  // deleteProduct,
  getProject,
  assessment,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/project/:id', getProject);
router.post('/assessment',assessment);
// router.get('/', getProducts);
// router.post('/new', createProduct);
// router.get('/product/:id', getProduct);
// router.put('/update/:id', updateProduct);
// router.delete('/delete/:id', deleteProduct);

export default router;
