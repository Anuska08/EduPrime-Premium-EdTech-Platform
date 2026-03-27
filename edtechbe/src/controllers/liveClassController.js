const LiveClass = require('../models/LiveClass');

// @desc   Get all live classes (upcoming first)
// @route  GET /api/live-classes
const getLiveClasses = async (req, res, next) => {
  try {
    const { subject, page = 1, limit = 10 } = req.query;
    const query = {};
    if (subject) query.subject = new RegExp(subject, 'i');

    const skip = (Number(page) - 1) * Number(limit);
    const total = await LiveClass.countDocuments(query);
    const liveClasses = await LiveClass.find(query)
      .sort({ scheduledAt: 1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('instructor', 'name avatar');

    res.json({ success: true, total, liveClasses });
  } catch (err) {
    next(err);
  }
};

// @desc   Get single live class
// @route  GET /api/live-classes/:id
const getLiveClass = async (req, res, next) => {
  try {
    const liveClass = await LiveClass.findById(req.params.id).populate('instructor', 'name avatar bio');
    if (!liveClass) return res.status(404).json({ success: false, message: 'Live class not found' });
    res.json({ success: true, liveClass });
  } catch (err) {
    next(err);
  }
};

// @desc   Create live class (admin/teacher)
// @route  POST /api/live-classes
const createLiveClass = async (req, res, next) => {
  try {
    req.body.instructor = req.user.id;
    req.body.instructorName = req.user.name;
    const liveClass = await LiveClass.create(req.body);
    res.status(201).json({ success: true, liveClass });
  } catch (err) {
    next(err);
  }
};

// @desc   Delete live class (admin)
// @route  DELETE /api/live-classes/:id
const deleteLiveClass = async (req, res, next) => {
  try {
    const liveClass = await LiveClass.findById(req.params.id);
    if (!liveClass) return res.status(404).json({ success: false, message: 'Live class not found' });
    await liveClass.deleteOne();
    res.json({ success: true, message: 'Live class deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getLiveClasses, getLiveClass, createLiveClass, deleteLiveClass };
