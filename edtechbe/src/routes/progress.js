const express = require('express');
const router = express.Router();
const { getProgress, updateProgress, getAllProgress } = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAllProgress);
router.get('/:courseId', protect, getProgress);
router.put('/:courseId', protect, updateProgress);

module.exports = router;
