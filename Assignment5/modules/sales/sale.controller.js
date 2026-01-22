const express = require('express');
const { addSale, getQuantitySold, getAllSales } = require('./sale.service');

const router = express.Router();

router.post('/add-sale',addSale);

router.get('/get-quantity-sold',getQuantitySold);
router.get('/get-all-sales',getAllSales);


module.exports = router;