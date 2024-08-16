const express = require('express');
const { getusers, addNewUser, updateUser, deleteUser } = require('../controller/userscontroller');
const router = express.Router();

router.get('/getall', getusers);
router.post('/create',addNewUser);
router.put('/update',updateUser);
router.delete('/:id', deleteUser); 
module.exports = router;