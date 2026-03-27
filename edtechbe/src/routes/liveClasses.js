const express = require('express');
const router = express.Router();
const { getLiveClasses, getLiveClass, createLiveClass, deleteLiveClass, inviteStudent } = require('../controllers/liveClassController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getLiveClasses);
router.get('/:id', getLiveClass);
router.post('/', protect, authorize('teacher', 'admin'), createLiveClass);
router.post('/:id/invite', protect, authorize('teacher', 'admin'), inviteStudent);
router.delete('/:id', protect, authorize('admin'), deleteLiveClass);

module.exports = router;
