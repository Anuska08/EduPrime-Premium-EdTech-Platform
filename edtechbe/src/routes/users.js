const express = require('express');
const router = express.Router();
const { getUser, updateUser, getInstructors } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/instructors', getInstructors);
router.get('/:id', protect, getUser);
router.put('/:id', protect, updateUser);

module.exports = router;
