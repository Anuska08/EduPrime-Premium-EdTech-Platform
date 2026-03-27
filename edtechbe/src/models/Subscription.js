const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    monthlyPrice: { type: Number, default: 0 },
    yearlyPrice: { type: Number, default: 0 },
    description: { type: String, default: '' },
    features: [{ type: String }],
    cta: { type: String, default: 'Get Started' },
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscription', SubscriptionSchema);
