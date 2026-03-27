const Subscription = require('../models/Subscription');

// @desc   Get all plans
// @route  GET /api/subscriptions
const getPlans = async (req, res, next) => {
  try {
    const plans = await Subscription.find({ isActive: true }).sort({ monthlyPrice: 1 });
    res.json({ success: true, plans });
  } catch (err) {
    next(err);
  }
};

// @desc   Create plan (admin)
// @route  POST /api/subscriptions
const createPlan = async (req, res, next) => {
  try {
    const plan = await Subscription.create(req.body);
    res.status(201).json({ success: true, plan });
  } catch (err) {
    next(err);
  }
};

// @desc   Subscribe user to a plan
// @route  PUT /api/subscriptions/subscribe
const subscribePlan = async (req, res, next) => {
  try {
    const { planName } = req.body;
    const plan = await Subscription.findOne({ name: planName, isActive: true });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    const User = require('../models/User');
    const user = await User.findByIdAndUpdate(req.user.id, { plan: plan.name }, { new: true }).select('-password');
    res.json({ success: true, message: `Subscribed to ${plan.name}`, user });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPlans, createPlan, subscribePlan };
