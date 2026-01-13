const express = require('express');
const { addUser, updateUser, deleteUser, getUserByName, getAllUsers, filterUserAge, getUserById} = require('./user.service');
const router = express.Router();

router.post('/add-user',addUser);
router.patch('/update-user/:id',updateUser);
router.delete('/delete-user/:id',deleteUser);
router.get('/get-user-by-name',getUserByName);
router.get('/get-all-users',getAllUsers);
router.get('/filter-user-age',filterUserAge);
router.get('/get-user-by-id/:id',getUserById);
module.exports = router;