const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getStats
} = require('../controllers/productController');

const validateProduct = require('../middleware/validateProduct');

router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/stats', getStats);
router.get('/:id', getProductById);
router.post('/', validateProduct, createProduct);
router.put('/:id', validateProduct, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;