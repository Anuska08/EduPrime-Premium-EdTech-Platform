const express = require('express');
const router = express.Router();
const { enroll, getMyEnrollments, getCourseEnrollments } = require('../controllers/enrollmentController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, enroll);
router.get('/mine', protect, getMyEnrollments);
router.get('/course/:courseId', protect, authorize('teacher', 'admin'), getCourseEnrollments);

module.exports = router;
