const User = require('../models/User');

// @desc   Get user by ID
// @route  GET /api/users/:id
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// @desc   Update user profile
// @route  PUT /api/users/:id
const updateUser = async (req, res, next) => {
  try {
    // Only allow user to update own profile (unless admin)
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    const allowedFields = ['name', 'bio', 'avatar'];
    const updates = {};
    allowedFields.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// @desc   Get all teachers/instructors (public)
// @route  GET /api/users/instructors
const getInstructors = async (req, res, next) => {
  try {
    const instructors = await User.find({ role: 'teacher' }).select('-password');
    res.json({ success: true, count: instructors.length, instructors });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUser, updateUser, getInstructors };
