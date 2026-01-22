const express = require('express');
const { changeContactNumberToVARCHAR, addSupplier, getSupplierStartsWithF, setPermissions, revokeUpdate, grantDelete } = require('./supplier.service');

const router = express.Router();

router.patch('/change-contactnumber-to-varchar',changeContactNumberToVARCHAR);
router.post('/add-supplier',addSupplier);
router.get('/get-suppliers-start-f',getSupplierStartsWithF);
router.post('/set-Permission',setPermissions);
router.patch('/revoke-update',revokeUpdate);
router.patch('/grant-delete',grantDelete);

module.exports = router;