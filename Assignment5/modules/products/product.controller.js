const express = require('express');
const { addCategoryColumn, deleteCategoryColumn, AddNotNull, addProduct, updateProductPrice, deleteProduct, getHighestStock } = require('./product.service');

const router = express.Router();

router.post('/add-column-category',addCategoryColumn);

router.delete('/delete-column-category',deleteCategoryColumn);
router.patch('/add-constraint',AddNotNull);
router.post('/add-product',addProduct);
router.patch('/update-product/:id',updateProductPrice);
router.delete('/delete-product/:id',deleteProduct);
router.get('/get-highest-stock',getHighestStock);

module.exports = router;