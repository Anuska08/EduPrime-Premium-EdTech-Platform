const express = require('express');
const router = express.Router();
const { getPlans, createPlan, subscribePlan } = require('../controllers/subscriptionController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getPlans);
router.post('/', protect, authorize('admin'), createPlan);
router.put('/subscribe', protect, subscribePlan);

module.exports = router;
