const express = require('express');
const router = express.Router();
const { getTeacherDashboard } = require('../controllers/teacherDashboardController');
const { protect, authorize } = require('../middleware/auth');

router.get('/dashboard', protect, authorize('teacher', 'admin'), getTeacherDashboard);

module.exports = router;
