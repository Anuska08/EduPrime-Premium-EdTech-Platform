const express = require('express');
const router = express.Router();
const { getTests, getTest, createTest, submitTest, getTestResult } = require('../controllers/testController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getTests);
router.get('/:id', getTest);
router.post('/', protect, authorize('teacher', 'admin'), createTest);
router.post('/:id/submit', protect, submitTest);
router.get('/:id/result', protect, getTestResult);

module.exports = router;
