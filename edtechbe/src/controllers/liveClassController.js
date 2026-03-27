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

// @desc   Invite student to live class
// @route  POST /api/live-classes/:id/invite
const inviteStudent = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const liveClass = await LiveClass.findById(req.params.id);
    if (!liveClass) return res.status(404).json({ success: false, message: 'Live class not found' });
    
    // Only instructor or admin can invite
    if (liveClass.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to invite students to this class' });
    }

    if (!liveClass.invitedEmails.includes(email.toLowerCase())) {
      liveClass.invitedEmails.push(email.toLowerCase());
      await liveClass.save();
    }
    
    res.json({ success: true, message: `Invited ${email} to class` });
  } catch (err) {
    next(err);
  }
};

module.exports = { getLiveClasses, getLiveClass, createLiveClass, deleteLiveClass, inviteStudent };
