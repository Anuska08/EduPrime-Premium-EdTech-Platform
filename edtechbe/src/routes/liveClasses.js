const express = require('express');
const router = express.Router();
const { getLiveClasses, getLiveClass, createLiveClass, deleteLiveClass } = require('../controllers/liveClassController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getLiveClasses);
router.get('/:id', getLiveClass);
router.post('/', protect, authorize('teacher', 'admin'), createLiveClass);
router.delete('/:id', protect, authorize('admin'), deleteLiveClass);

module.exports = router;
